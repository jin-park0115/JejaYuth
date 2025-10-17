export function Attendance() {
  const getCurrentSunday = () => {
    const today = new Date();
    let day = today.getDay();
    const sunday = new Date(today);

    if (day === 0) {
      sunday.setDate(today.getDate());
    } else {
      sunday.setDate(today.getDate() - day);
    }

    const offset = sunday.getTimezoneOffset() * 60000;
    const localISO = new Date(sunday.getTime() - offset)
      .toISOString()
      .split("T")[0];
    return localISO;
  };

  const currentSunday = getCurrentSunday();

  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">출석 체크</h1>
            <p className="text-gray-500 text-lg">{currentSunday}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="bg-white border-2 border-gray-300 rounded-lg p-8 hover:border-blue-500 transition-colors cursor-pointer">
              <span className="text-xl font-semibold text-gray-800">불참</span>
            </button>
            <button className="bg-white border-2 border-gray-300 rounded-lg p-8 hover:border-blue-500 transition-colors cursor-pointer">
              <span className="text-xl font-semibold text-gray-800">참석</span>
            </button>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors">
            제출
          </button>
        </div>
      </div>
    </div>
  );
}
