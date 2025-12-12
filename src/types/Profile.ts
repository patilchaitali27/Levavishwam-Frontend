// src/types/Profile.ts
export interface ProfileDto {
  userId: number;
  name: string;
  email?: string;
  mobile?: string;
  address?: string;
  dob?: string | null; // ISO date string
  gender?: string;
  communityInfo?: string;
  profilePhotoPath?: string;
}

export interface UpdateProfileRequest {
  // fields we keep in the UI form
  fullName?: string;
  email?:string;
  mobile?: string;
  address?: string;
  dob?: string | null; // 'yyyy-mm-dd' or null
  gender?: string;
  communityInfo?: string;
}
