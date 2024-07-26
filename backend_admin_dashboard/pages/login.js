import Loading from "@/components/Loading";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

const Login = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Loading state
    if (status === "loading") {
        return (
            <div className='loadingdata flex flex-col flex-center wh_100'>
                <Loading />
                <h1 className='mt-1'>Loading...</h1>
            </div>
        );
    }

    // Redirect if session exists
    if (session) {
        router.push('/');
        return null; // Return null or a loading indicator while redirecting
    }

    // Handle login
    const handleLogin = async () => {
        try {
            await signIn('google', { callbackUrl: 'http://localhost:3000/' });
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className="loginfront flex flex-center flex-col full-w">
            <Image src='/img/coder.png' width={250} height={250} alt="Coder Image" />
            <h1>Welcome Admin of the vbmblogs 👋</h1>
            <p>Visit our main website <a href="https://vbmcoder.in" target="_blank" rel="noopener noreferrer">vbmblogs</a></p>
            <button onClick={handleLogin} className='mt-2'>Login with Google</button>
        </div>
    );
};

export default Login;
