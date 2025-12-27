import { SignIn } from "@clerk/clerk-react";

function LoginPage() {
  return (
    <div className="h-screen hero">
      <SignIn forceRedirectUrl="/dashboard" signUpUrl="/signup" />
    </div>
  );
}
export default LoginPage;
