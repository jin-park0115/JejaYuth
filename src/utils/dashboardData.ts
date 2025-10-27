import axios from "axios";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabaseConfig";

interface DailyCheck {
  id: number;
  user_id: string;
  activity_type: string;
  check_date: string;
  created_at: string;
}

interface SundayCheck {
  id: number;
  user_id: string;
  check_attended: boolean;
  date: string;
  created_at: string;
}

interface WeeklyGoal {
  count: number;
  goal: number;
}

interface WeeklyData {
  prayer: WeeklyGoal;
  scripture: WeeklyGoal;
  qt: WeeklyGoal;
  attendance: WeeklyGoal;
}

interface DayActivity {
  day: number;
  prayer: boolean;
  scripture: boolean;
  qt: boolean;
}

export function getLastWeekRange(): { startDate: Date; endDate: Date } {
  const today = new Date();
  const currentDay = today.getDay();

  const daysToThisMonday = currentDay === 0 ? 8 : currentDay + 6;
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysToThisMonday);
  lastMonday.setHours(0, 0, 0, 0);

  const lastSunday = new Date(lastMonday);
  lastSunday.setDate(lastMonday.getDate() + 6);
  lastSunday.setHours(23, 59, 59, 999);

  return { startDate: lastMonday, endDate: lastSunday };
}

export function getLastSunday(): string {
  const today = new Date();
  const day = today.getDay();

  const thisSunday = new Date(today);
  thisSunday.setDate(today.getDate() - day);

  const lastSunday = new Date(thisSunday);
  lastSunday.setDate(thisSunday.getDate() - 7);

  return lastSunday.toISOString().split("T")[0];
}

export async function fetchLastWeekActivities(
  userId: string,
  accessToken: string
): Promise<DailyCheck[]> {
  const { startDate, endDate } = getLastWeekRange();

  const startDateStr = startDate.toISOString().split("T")[0];
  const endDateStr = endDate.toISOString().split("T")[0];

  const api = axios.create({
    baseURL: `${SUPABASE_URL}/rest/v1`,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
  });

  try {
    const response = await api.get<DailyCheck[]>(
      `/daily_checks?user_id=eq.${userId}&check_date=gte.${startDateStr}&check_date=lte.${endDateStr}&order=check_date.asc`
    );
    return response.data;
  } catch (error) {
    console.error("패칭 에러", error);
    throw error;
  }
}

export async function fetchLastWeekAttendance(
  userId: string,
  accessToken: string
): Promise<SundayCheck[]> {
  const lastSundayStr = getLastSunday();

  const api = axios.create({
    baseURL: `${SUPABASE_URL}/rest/v1`,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
  });

  try {
    const response = await api.get<SundayCheck[]>(
      `/sunday_check?user_id=eq.${userId}&check_attended=eq.true&date=eq.${lastSundayStr}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching attendance:", error);
    throw error;
  }
}

export function transformToWeeklyData(
  activities: DailyCheck[],
  attendance: SundayCheck[]
): WeeklyData {
  const prayerDays = new Set<string>();
  const scriptureDays = new Set<string>();
  const qtDays = new Set<string>();

  activities.forEach((activity) => {
    const date = activity.check_date;
    switch (activity.activity_type) {
      case "prayer":
        prayerDays.add(date);
        break;
      case "bible":
        scriptureDays.add(date);
        break;
      case "qt":
        qtDays.add(date);
        break;
    }
  });

  return {
    prayer: { count: prayerDays.size, goal: 7 },
    scripture: { count: scriptureDays.size, goal: 7 },
    qt: { count: qtDays.size, goal: 7 },
    attendance: { count: attendance.length, goal: 1 },
  };
}

export function transformToActivityLog(
  activities: DailyCheck[]
): DayActivity[] {
  const { startDate } = getLastWeekRange();
  const activityLog: DayActivity[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dateStr = currentDate.toISOString().split("T")[0];

    const dayActivities = activities.filter(
      (activity) => activity.check_date === dateStr
    );

    activityLog.push({
      day: i,
      prayer: dayActivities.some((a) => a.activity_type === "prayer"),
      scripture: dayActivities.some((a) => a.activity_type === "bible"),
      qt: dayActivities.some((a) => a.activity_type === "qt"),
    });
  }

  return activityLog;
}
