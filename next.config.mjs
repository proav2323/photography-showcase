/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_SECRET: '78zFZvyspgAIBXPKdA0AhFqcNWXX16/CEmBFOHU3iOg='
    },
    images: {
        domains: ["firebasestorage.googleapis.com"]
    }
};

export default nextConfig;
