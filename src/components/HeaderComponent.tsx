import { useAuthStore } from "../store/useAuthStore";

export function HeaderComponents() {
  const profile = useAuthStore((state) => state.profile);

  return (
    <>
      <div className="flex justify-between pt-[10px] pr-5 pl-[10px] ">
        <p>내활동</p>
        <div className="flex gap-3">
          <p>{profile?.name || "이름없음"}</p>
          <p>{profile?.role || "직책없음"}</p>
        </div>
      </div>
    </>
  );
}
