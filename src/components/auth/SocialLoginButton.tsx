import Image from 'next/image';

interface SocialLoginButtonProps {
  iconSrc: string;
  backgroundColor: string;
  border: string;
  text: string;
  iconWidth?: number;
  socialType: 'kakao' | 'google';
}

export const SocialLoginButton = ({
  socialType,
  iconSrc,
  backgroundColor,
  border,
  text,
  iconWidth,
}: SocialLoginButtonProps) => {
  const handleKakaoLogin = () => {
    localStorage.setItem('provider', 'kakao');
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
  };

  const handleGoogleLogin = () => {
    localStorage.setItem('provider', 'google');
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
  };

  return (
    <button
      style={{
        backgroundColor,
        border: border ? `1px solid ${border}` : 'none',
        boxSizing: 'border-box',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '3rem',
        gap: '1rem',
      }}
      onClick={socialType === 'kakao' ? handleKakaoLogin : handleGoogleLogin}
    >
      <Image src={iconSrc} alt="social Icon" width={iconWidth ? iconWidth : 24} height={24} />
      <p className="text-[1.125rem] font-bold leading-none text-gray-900">{text}</p>
    </button>
  );
};
