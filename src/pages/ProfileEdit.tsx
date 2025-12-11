import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ProfileDto, UpdateProfileRequest } from '../types/Profile';
import { User, Phone, MapPin, Calendar, Users, ChevronLeft } from "lucide-react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const initialState: UpdateProfileRequest = {
  fullName: '',
  mobile: '',
  address: '',
  dob: null,
  gender: '',
  communityInfo: ''
};

const genders = ['', 'Male', 'Female', 'Other'];

const EditProfile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate()
  const userId = user?.userId;
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [form, setForm] = useState<UpdateProfileRequest>(initialState);

  useEffect(() => {
    console.log('[EditProfile] mount user from useAuth():', user);
    if (!userId) {
      setError('No logged-in user found. Please login.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    const url = `/api/edit-profile/${userId}`;
    console.log('[EditProfile] fetching profile from:', api.defaults.baseURL ? api.defaults.baseURL + url : url);

    api.get<ProfileDto>(url)
      .then(res => {
        console.log('[EditProfile] GET response:', res);
        const d = res.data;
        setForm({
          fullName: d.name ?? '',
          mobile: d.mobile ?? '',
          address: d.address ?? '',
          dob: d.dob ? d.dob.split('T')[0] : null,
          gender: d.gender ?? '',
          communityInfo: d.communityInfo ?? ''
        });
      })
      .catch(err => {
        console.error('[EditProfile] GET error:', err);
        const msg = err?.response
          ? `Request failed ${err.response.status}: ${JSON.stringify(err.response.data)}`
          : err.message || 'Failed to load profile';
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, [user, userId]);

  const onChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
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

    // remove time part from today's date
    today.setHours(0, 0, 0, 0);

    if (selected >= today) {
      setError("Date of Birth must be earlier than today");
      return false;
    }
  }
    return true;
    
  };

  const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;
  if (!userId) {
    setError('No logged-in user found. Please login.');
    return;
  }

  setSaving(true);
  setSuccess('');
  setError('');

  // sanitize DOB: send null if empty, otherwise ISO date (server expects DateTime?)
  const dobPayload = form.dob ? new Date(form.dob).toISOString() : null;

  const payload: any = {
    Name: form.fullName ?? undefined,
    Email: (user && (user as any).email) ? (user as any).email : undefined,
    Mobile: form.mobile ?? undefined,
    Address: form.address ?? undefined,
    DOB: dobPayload,
    Gender: form.gender ?? undefined,
    CommunityInfo: form.communityInfo ?? undefined
  };

  // remove undefined keys to avoid sending empty props if not needed
  Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k]);

  try {
    console.log('[EditProfile] PUT payload', payload);
    const resp = await api.put(`/api/edit-profile/${userId}`, payload, { validateStatus: () => true });
    console.log('[EditProfile] PUT response', resp);

    if (resp.status === 204 || resp.status === 200) {
      setSuccess("Profile updated successfully!");
    } else if (resp.status === 400 && resp.data && resp.data.errors) {
      console.warn('[EditProfile] Validation errors:', resp.data.errors);
      // create a readable error message from validation errors
      const messages = Object.entries(resp.data.errors)
        .map(([field, msgs]: any) => `${field}: ${(msgs as string[]).join(', ')}`)
        .join(' | ');
      setError(`Validation failed: ${messages}`);
    } else if (resp.status === 404) {
      setError("Profile or user not found.");
    } else {
      const serverMsg = resp.data?.message || resp.statusText;
      setError(`Failed to update profile (${resp.status}): ${serverMsg}`);
    }
  } catch (err: any) {
    console.error('[EditProfile] PUT error', err);
    const msg = err?.response
      ? `Request failed ${err.response.status}: ${JSON.stringify(err.response.data)}`
      : err.message || 'Failed to update profile';
    setError(msg);
  } finally {
    setSaving(false);
  }
};


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
          <h2 className="text-3xl font-bold text-gray-900 mt-4">Edit Profile</h2>
          <p className="text-gray-600 text-sm">Update your personal information</p>
        </div>

        {error && <div className="mb-4 text-red-700 bg-red-100 p-3 rounded-lg break-words">{error}</div>}
        {success && <div className="mb-4 text-green-700 bg-green-100 p-3 rounded-lg">{success}</div>}

        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label className="font-semibold text-gray-700 text-sm">Full Name</label>
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-white shadow-sm mt-1">
              <User className="w-5 h-5 text-purple-600" />
              <input
                name="fullName"
                value={form.fullName ?? ''}
                onChange={onChange}
                placeholder="Enter full name"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-700 text-sm">Mobile Number</label>
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-white shadow-sm mt-1">
              <Phone className="w-5 h-5 text-purple-600" />
              <input
                name="mobile"
                value={form.mobile ?? ''}
                onChange={onChange}
                placeholder="Enter mobile number"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-700 text-sm">Address</label>
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-white shadow-sm mt-1">
              <MapPin className="w-5 h-5 text-purple-600 self-start mt-1" />
              <textarea
                name="address"
                rows={2}
                value={form.address ?? ''}
                onChange={onChange}
                className="w-full outline-none bg-transparent resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-gray-700 text-sm">Date of Birth</label>
              <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-white shadow-sm mt-1">
                <Calendar className="w-5 h-5 text-purple-600" />
                <input
                  type="date"
                  name="dob"
                  value={form.dob ?? ''}
                  onChange={onChange}
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700 text-sm">Gender</label>
              <div className="border rounded-xl px-4 py-3 bg-white shadow-sm mt-1">
                <select
                  name="gender"
                  value={form.gender ?? ''}
                  onChange={onChange}
                  className="w-full outline-none bg-transparent"
                >
                  {genders.map(g => <option key={g} value={g}>{g || "Select Gender"}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-700 text-sm">Community Info</label>
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-white shadow-sm mt-1">
              <Users className="w-5 h-5 text-purple-600 self-start mt-1" />
              <textarea
                name="communityInfo"
                rows={3}
                value={form.communityInfo ?? ''}
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
              onClick={() => { setForm(initialState); setError(''); setSuccess(''); }}
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
