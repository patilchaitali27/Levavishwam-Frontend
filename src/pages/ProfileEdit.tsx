import React, { useEffect, useState } from "react";
import api from "../services/api";
import { ProfileDto, UpdateProfileRequest } from "../types/Profile";
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Users,
  ChevronLeft,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { AxiosProgressEvent } from "axios";

const initialState: UpdateProfileRequest = {
  fullName: "",
  email: "",
  mobile: "",
  address: "",
  dob: null,
  gender: "",
  communityInfo: "",
};

const genders = ["", "Male", "Female", "Other"];

const EditProfile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userId = user?.userId;
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [form, setForm] = useState<UpdateProfileRequest>(initialState);

  // photo state
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    if (!userId) {
      setError("No logged-in user found. Please login.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    const url = `/api/profile/get/${userId}`;

    api
      .get<ProfileDto>(url)
      .then((res) => {
        const d = res.data;
        setForm({
          fullName: d.name ?? "",
          email: d.email ?? "",
          mobile: d.mobile ?? "",
          address: d.address ?? "",
          dob: d.dob ? d.dob.split("T")[0] : null,
          gender: d.gender ?? "",
          communityInfo: d.communityInfo ?? "",
        });

        setPhotoUrl(d.profilePhotoPath ?? null);
        console.log(d.profilePhotoPath);
      })
      .catch((err) => {
        const msg = err?.response
          ? `Request failed ${err.response.status}: ${JSON.stringify(
              err.response.data
            )}`
          : err.message || "Failed to load profile";
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, [user, userId]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const onChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const validate = () => {
    if (!form.fullName || form.fullName.trim().length < 2) {
      setError("Full Name must be at least 2 characters");
      return false;
    }

    if (form.mobile && form.mobile.trim().length > 0) {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(form.mobile)) {
        setError("Mobile number must be 10 digits");
        return false;
      }
    }

    if (form.dob) {
      const selected = new Date(form.dob);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected >= today) {
        setError("Date of Birth must be earlier than today");
        return false;
      }
    }
    return true;
  };

  // NEW: unified onSubmit — uploads image first (if any) then updates profile
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!userId) {
      setError("No logged-in user found. Please login.");
      return;
    }

    setSaving(true);
    setSuccess("");
    setError("");

    // sanitize DOB
    const dobPayload = form.dob ? new Date(form.dob).toISOString() : null;

    let uploadedPhotoUrl = photoUrl; // use existing if no new upload

    try {
      // If a new file is selected, upload it first
      if (selectedFile) {
        const fd = new FormData();
        fd.append("file", selectedFile);

        setUploading(true);
        setUploadProgress(0);

        const uploadResp = await api.post(`/api/profile/${userId}/photo`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            const loaded = progressEvent?.loaded ?? 0;
            const total = progressEvent?.total ?? 0;
            if (!total) return;
            const percent = Math.round((loaded * 100) / total);
            setUploadProgress(percent);
          },
          validateStatus: () => true,
        });

        setUploading(false);
        setUploadProgress(0);

        if (uploadResp.status === 200 || uploadResp.status === 201) {
          uploadedPhotoUrl =
            uploadResp.data?.url ??
            uploadResp.data?.Url ??
            uploadResp.data?.Url ??
            null;
          if (!uploadedPhotoUrl) {
            setError("Upload succeeded but server did not return image URL");
            setSaving(false);
            return;
          }
          setPhotoUrl(uploadedPhotoUrl);
          setSelectedFile(null);
          setPreviewUrl(null);
        } else {
          const serverMsg =
            uploadResp.data?.error ||
            JSON.stringify(uploadResp.data) ||
            uploadResp.statusText;
          setError(`Image upload failed (${uploadResp.status}): ${serverMsg}`);
          setSaving(false);
          return;
        }
      }

      // Now update profile text fields (include ProfilePhotoPath so server persists it)
      const payload: any = {
        Name: form.fullName ?? undefined,
        Email: user && (user as any).email ? (user as any).email : undefined,
        Mobile: form.mobile ?? undefined,
        Address: form.address ?? undefined,
        DOB: dobPayload,
        Gender: form.gender ?? undefined,
        CommunityInfo: form.communityInfo ?? undefined,
        ProfilePhotoPath: uploadedPhotoUrl ?? undefined,
      };

      Object.keys(payload).forEach(
        (k) => payload[k] === undefined && delete payload[k]
      );

      const resp = await api.put(`/api/profile/update/${userId}`, payload, {
        validateStatus: () => true,
      });

      if (resp.status === 204 || resp.status === 200) {
        setSuccess("Profile updated successfully!");
      } else if (resp.status === 400 && resp.data && resp.data.errors) {
        const messages = Object.entries(resp.data.errors)
          .map(
            ([field, msgs]: any) => `${field}: ${(msgs as string[]).join(", ")}`
          )
          .join(" | ");
        setError(`Validation failed: ${messages}`);
      } else if (resp.status === 404) {
        setError("Profile or user not found.");
      } else {
        const serverMsg = resp.data?.message || resp.statusText;
        setError(`Failed to update profile (${resp.status}): ${serverMsg}`);
      }
    } catch (err: any) {
      console.error("[EditProfile] submit error", err);
      const msg = err?.response
        ? `Request failed ${err.response.status}: ${JSON.stringify(
            err.response.data
          )}`
        : err.message || "Failed to update profile";
      setError(msg);
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setSaving(false);
    }
  };

  const onDeletePhoto = async () => {
    setError("");
    setSuccess("");

    if (!userId) {
      setError("No logged-in user found. Please login.");
      return;
    }

    if (!photoUrl) {
      setError("No profile photo to delete.");
      return;
    }

    // Confirmation (simple browser confirm - replace with custom modal if you prefer)
    const ok = window.confirm(
      "Are you sure you want to delete your profile photo?"
    );
    if (!ok) return;

    setDeleting(true);
    try {
      const resp = await api.delete(`/api/profile/${userId}/deletePhoto`, {
        validateStatus: () => true,
      });

      if (resp.status === 200 || resp.status === 204) {
        // clear local states - server already cleared DB
        setPhotoUrl(null);
        setSelectedFile(null);
        setPreviewUrl(null);
        setSuccess("Profile photo deleted.");
      } else if (resp.status === 404) {
        setError("Profile not found.");
      } else {
        const serverMsg =
          resp.data?.message ||
          resp.data?.error ||
          JSON.stringify(resp.data) ||
          resp.statusText;
        setError(`Delete failed (${resp.status}): ${serverMsg}`);
      }
    } catch (err: any) {
      console.error("[EditProfile] delete photo error", err);
      const msg = err?.response
        ? `Request failed ${err.response.status}: ${JSON.stringify(
            err.response.data
          )}`
        : err.message || "Failed to delete profile photo";
      setError(msg);
    } finally {
      setDeleting(false);
    }
  };

  //Helper
  const getImageUrl = (path?: string | null) => {
    if (!path) return null;

    if (path.startsWith("http")) return path;

    const base = api.defaults.baseURL?.replace(/\/$/, "") ?? "";
    const clean = path.startsWith("/") ? path : `/${path}`;

    return base + clean;
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setSuccess("");
    const f = e.target.files?.[0] ?? null;
    if (!f) {
      setSelectedFile(null);
      return;
    }

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxBytes = 5 * 1024 * 1024;
    if (!allowed.includes(f.type)) {
      setError("Only JPG/PNG/WEBP images are allowed");
      return;
    }
    if (f.size > maxBytes) {
      setError("File size must be <= 5MB");
      return;
    }

    setSelectedFile(f);
  };

  // const uploadPhoto = async () => {
  //   if (!selectedFile) {
  //     setError('No file selected');
  //     return;
  //   }
  //   if (!userId) {
  //     setError('No logged-in user found. Please login.');
  //     return;
  //   }

  //   const fd = new FormData();
  //   fd.append('file', selectedFile);

  //   setUploading(true);
  //   setUploadProgress(0);
  //   setError('');
  //   setSuccess('');

  //   try {
  //     const resp = await api.post(`/api/profile/${userId}/photo`, fd, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //       onUploadProgress: (progressEvent: AxiosProgressEvent) => {
  //         const loaded = progressEvent?.loaded ?? 0;
  //         const total = progressEvent?.total ?? 0;
  //         if (!total) return;
  //         const percent = Math.round((loaded * 100) / total);
  //         setUploadProgress(percent);
  //       },
  //       validateStatus: () => true
  //     });

  //     if (resp.status === 200 || resp.status === 201) {
  //       const url = resp.data?.url ?? resp.data?.Url ?? resp.data?.Url ?? null;
  //       if (url) {
  //         setPhotoUrl(url);
  //         setSelectedFile(null);
  //         setPreviewUrl(null);
  //         setSuccess('Profile photo uploaded!');
  //       } else {
  //         setError('Upload succeeded but server did not return image URL');
  //       }
  //     } else if (resp.status === 400) {
  //       setError(resp.data?.error || JSON.stringify(resp.data) || 'Upload rejected');
  //     } else {
  //       setError(`Upload failed (${resp.status}): ${resp.statusText}`);
  //     }
  //   } catch (err: any) {
  //     console.error('[EditProfile] upload error', err);
  //     const msg = err?.response
  //       ? `Request failed ${err.response.status}: ${JSON.stringify(err.response.data)}`
  //       : err.message || 'Upload failed';
  //     setError(msg);
  //   } finally {
  //     setUploading(false);
  //     setUploadProgress(0);
  //   }
  // };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Loading profile…
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        No user logged in. Please log in to edit your profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-10 px-4">
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-10">
        <button
          onClick={() => navigate("/", { state: { scrollToId: "home" } })}
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </button>
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            Edit Profile
          </h2>
          <p className="text-gray-600 text-sm">
            Update your personal information
          </p>
        </div>

        {error && (
          <div className="mb-4 text-red-700 bg-red-100 p-3 rounded-lg break-words">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-green-700 bg-green-100 p-3 rounded-lg">
            {success}
          </div>
        )}

        {/* Photo upload section */}
        <div className="mb-6">
          <label className="font-semibold text-gray-700 text-sm block mb-2">
            Profile Photo
          </label>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center border">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : photoUrl ? (
                <img
                  src={getImageUrl(photoUrl) || ""}
                  alt="profile"
                  className="w-full h-full object-cover"
                  onError={() => setPhotoUrl(null)}
                />
              ) : (
                <div className="text-gray-400 flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <input
                id="profile-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="mb-2 block"
                disabled={uploading || deleting || saving}
              />

              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  onClick={() => {
                    // quick remove selected file & preview (before upload)
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    setError("");
                    setSuccess("");
                  }}
                  disabled={!selectedFile || uploading || deleting || saving}
                  className="px-3 py-2 rounded-xl border text-gray-700 bg-white hover:bg-gray-50 transition shadow-sm text-sm"
                >
                  Cancel Selection
                </button>

                <button
                  type="button"
                  onClick={onDeletePhoto}
                  disabled={deleting || uploading || !photoUrl || saving}
                  className="px-3 py-2 rounded-xl bg-red-600 text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
                >
                  {deleting ? "Deleting…" : "Delete Photo"}
                </button>

                {/* optional small upload progress indicator */}
                {uploading && (
                  <div className="text-xs ml-3 text-gray-600">
                    Uploading… {uploadProgress}%
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Allowed: JPG, PNG, WEBP — Max 5MB.
              </p>
            </div>
          </div>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label className="font-semibold text-gray-700 text-sm">
              Full Name
            </label>
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-white shadow-sm mt-1">
              <User className="w-5 h-5 text-purple-600" />
              <input
                name="fullName"
                value={form.fullName ?? ""}
                onChange={onChange}
                placeholder="Enter full name"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-700 text-sm">
              Mobile Number
            </label>
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-white shadow-sm mt-1">
              <Phone className="w-5 h-5 text-purple-600" />
              <input
                name="mobile"
                value={form.mobile ?? ""}
                onChange={onChange}
                placeholder="Enter mobile number"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-700 text-sm">
              Address
            </label>
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-white shadow-sm mt-1">
              <MapPin className="w-5 h-5 text-purple-600 self-start mt-1" />
              <textarea
                name="address"
                rows={2}
                value={form.address ?? ""}
                onChange={onChange}
                className="w-full outline-none bg-transparent resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-gray-700 text-sm">
                Date of Birth
              </label>
              <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-white shadow-sm mt-1">
                <Calendar className="w-5 h-5 text-purple-600" />
                <input
                  type="date"
                  name="dob"
                  value={form.dob ?? ""}
                  onChange={onChange}
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700 text-sm">
                Gender
              </label>
              <div className="border rounded-xl px-4 py-3 bg-white shadow-sm mt-1">
                <select
                  name="gender"
                  value={form.gender ?? ""}
                  onChange={onChange}
                  className="w-full outline-none bg-transparent"
                >
                  {genders.map((g) => (
                    <option key={g} value={g}>
                      {g || "Select Gender"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-700 text-sm">
              Community Info
            </label>
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-white shadow-sm mt-1">
              <Users className="w-5 h-5 text-purple-600 self-start mt-1" />
              <textarea
                name="communityInfo"
                rows={3}
                value={form.communityInfo ?? ""}
                onChange={onChange}
                className="w-full outline-none bg-transparent resize-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => {
                setForm(initialState);
                setError("");
                setSuccess("");
              }}
              className="px-6 py-3 rounded-xl border text-gray-700 bg-white hover:bg-gray-50 transition shadow-sm"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
