import { useEffect, useState } from "react";

export function HeaderComponents() {
  const [name, setName] = useState<string | null>("");
  const [role, setRole] = useState<string | null>("");
  useEffect(() => {
    const profile = localStorage.getItem("profile");

    if (profile) {
      try {
        const retrivedObject = JSON.parse(profile);
        if (retrivedObject) {
          setName(retrivedObject.name || "");
          setRole(retrivedObject.role || "");
        }
      } catch (error) {
        console.error("localstorage 데이터파싱 오류", error);
      }
    }
  }, []);
  return (
    <>
      <div className="flex justify-between pt-[10px] pr-5 pl-[10px] ">
        <p>내활동</p>
        <div className="flex gap-3">
          <p>{name}</p>
          <p>{role}</p>
        </div>
      </div>
    </>
  );
}
