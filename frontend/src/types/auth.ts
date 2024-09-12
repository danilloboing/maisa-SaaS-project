

export type AuthContextValues = {
    userInfo: UserInfo | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    loggedInUser: boolean | null;
    onLogoutHandler: () => void;
    onLoginHandler: (data: LoginData) => Promise<void>;
}

export type LoginData = {
    email: string;
    password: string;
}

export type UserInfo = {
    id: number;
    email: string;
    name: string;
    token: string;
}