import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuthStore } from "../store/useAuthStore";

export default function CellMemberPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const profile = useAuthStore((state) => state.profile);

  console.log(profile);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        let query = supabase.from("users").select("*");
        if (profile.role === "리더") {
          query = query.eq("cell", profile.cell);
        } else if (profile.role === "목사님") {
          query = query.order("cell", { ascending: true });
        } else {
          setMembers([]);
          return;
        }

        const { data, error } = await query;
        console.log("cellmember query result", { data, error, profile });

        const { data: userData } = await supabase.auth.getUser();
        console.log("auth user id:", userData?.user?.id);
        console.log("profile id:", profile?.id);

        const { data: sessionData } = await supabase.auth.getSession();
        console.log("session:", sessionData?.session);

        if (error) throw error;
        setMembers(data || []);
      } catch (error) {
        console.error("데이터 로드 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, [profile]);

  if (loading) return <div className="p-6 text-white/80">로딩 중...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">
        {profile.role === "리더" ? `${profile.cell}셀 명단` : "전체명단 조회"}
      </h1>

      <div className="grid gap-4">
        {members.length > 0 ? (
          members.map((member) => (
            <div
              key={member.id}
              className="p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg flex justify-between"
            >
              <div>
                <span className="font-semibold text-white">{member.name}</span>
                <span className="ml-2 text-sm text-white/70">
                  {member.cell}
                </span>
              </div>
              <span className="text-white/80 text-sm font-medium">
                {member.role}
              </span>
            </div>
          ))
        ) : (
          <p className="text-white/70">표시할 명단이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
