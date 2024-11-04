export interface ChangeProfileProps {
    bio?: string;
    role?: 'ADMIN' | 'TEAM' | 'USER';
    name?: string;
    projects?: string[];
    education?: string[];
    achievements?: string[];
    interests?: string[];
    socials?: string[];
    image?: string;
    rolesInTeam?: string[];
}