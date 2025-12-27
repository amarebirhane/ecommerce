import { SignUp } from "@clerk/clerk-react";

function SignupPage() {
    return (
        <div className="h-screen hero">
            <SignUp forceRedirectUrl="/dashboard" signInUrl="/login" />
        </div>
    );
}

export default SignupPage;
