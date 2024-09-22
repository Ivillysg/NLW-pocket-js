import Logo from "../assets/logo-in-orbit.svg";
import { GithubIcon } from "../components/icons/github-icon";

export default function SignIn() {
  function handleRedirectGithubAuth() {
    const githubSignInURL = new URL(
      "login/oauth/authorize",
      "https://github.com"
    );

    githubSignInURL.searchParams.set(
      "client_id",
      import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID
    );
    githubSignInURL.searchParams.set(
      "redirect_uri",
      import.meta.env.VITE_OAUTH_CLIENT_REDIRECT_URI
    );
    githubSignInURL.searchParams.set("scope", "user");

    window.location.href = githubSignInURL.toString();
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-black to-zinc-800">
      <img
        src={"/bg-sign-in.png"}
        alt="sign-in-background"
        className="absolute right-0 bottom-5"
      />
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleRedirectGithubAuth}
          type="button"
          className="flex items-center gap-2 bg-zinc-800 p-2 rounded-lg z-10"
        >
          <GithubIcon />
          Entre com o github
        </button>
      </div>
    </div>
  );
}
