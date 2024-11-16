export interface APIResult {
    status: string,
    data: any
}

export interface Interest {
    id: number,
    name: string,
    category: Category
}

export interface Category {
    id: number,
    name: string
}

export interface User {
    id?: number,
    name: string,
    mobile?: string,
    gender: string,
    dob: string,
    token?: string,
    interests?: Array<Interest>,
    email?: string,
    profile1?: string,
    profile2?: string,
    profile3?: string,
    description?: string,
    facebook?: string,
    insta?: string,
    twitter?: string,
    linkedin?: string,
    facebook_public?: Boolean,
    insta_public?: Boolean,
    twitter_public?: Boolean,
    linkedin_public?: Boolean,
    facebook_active?: Boolean,
    insta_active?: Boolean,
    twitter_active?: Boolean,
    linkedin_active?: Boolean,
    last_lat?: number,
    last_lon?: number,
    saved_profiles?: Array<User>,
    distance?: number,
    min_age?: number,
    max_age?: number,
}
