interface StatCardProps {
  value: number | string;
  label: string;
  color: string;
}

export default function StatCard({ value, label, color }: StatCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 text-center">
      <div className={`text-3xl font-bold ${color} mb-2`}>{value}</div>
      <div className="text-white/70">{label}</div>
    </div>
  );
}
