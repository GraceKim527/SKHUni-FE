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
      <div className="flex gap-2 items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 입력"
          className="px-4 py-3 text-sm rounded-md border border-gray-300 leading-0 text-gray-700 outline-[#512DA8]"
        />
        <p className="text-lg text-gray-700">@office.skhu.ac.kr</p>
      </div>

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
