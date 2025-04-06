interface Props {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string;
}

export default function EmailStep({ email, setEmail, onSubmit, loading, error }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="학교 이메일을 입력하세요."
        className="px-4 py-3 text-sm rounded-md border border-gray-300 leading-0 text-gray-700 outline-[#512DA8]"
      />
      {error && <p className="text-sm text-[#E53935]">{error}</p>}
      <button
        onClick={onSubmit}
        disabled={loading}
        className="py-3 text-sm text-white bg-[#512DA8] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? '전송 중...' : '인증번호 받기'}
      </button>
    </div>
  );
}
