const dailyGoals = [
  "Pray all 5 salah on time",
  "Read Quran 10 minutes after Fajr",
  "Say Astaghfirullah 100x today",
  "Lower your gaze at college today",
  "Watch 1 Islamic video after Asr",
  "Do evening Adhkar before sleeping",
  "Thank Allah for 3 things at night",
  "Avoid gossip and useless talk",
  "Reflect on your purpose today",
  "Help someone without being asked",
  "Send 100 salawat on the Prophet ﷺ",
  "Make sincere du'a after each prayer",
  "Fast or skip distractions today",
  "Make istighfar 50x after Maghrib",
  "Memorize a du’a today",
  "Speak kindly all day",
  "Avoid music — listen to Quran",
  "Read one Seerah story",
  "Pray 2 rakah Sunnah mindfully",
  "Say Bismillah before every task",
  "Be kind to your parents today",
  "Pray Fajr and stay awake",
  "Avoid all arguments today",
  "Write a du’a for yourself",
  "Recite Surah Mulk before sleep",
  "Make du’a before Maghrib (Friday)",
  "Reflect on one heart change",
  "Plan a long-term good habit",
  "Wake for Tahajjud if possible",
  "Thank Allah for your progress"
];

const staticChecklist = [
  "Fajr + Morning Dhikr",
  "Quran (6:00–6:30 AM)",
  "Du'a (post-breakfast)",
  "Dhuhr + Dhikr",
  "Asr (4:00 PM)",
  "Reminder video/reading",
  "Maghrib",
  "Isha",
  "Evening Adhkar (post-Isha)",
  "Sleep by 10 PM"
];

let currentDay = parseInt(localStorage.getItem("currentDay")) || 1;

function loadChecklist(day) {
  document.getElementById("day-number").innerText = day;
  document.getElementById("daily-goal").innerText = dailyGoals[day - 1];

  const checklistDiv = document.getElementById("checklist");
  checklistDiv.innerHTML = "";

  staticChecklist.forEach((task, index) => {
    const checkboxId = `day${day}_task${index}`;
    const isChecked = localStorage.getItem(checkboxId) === "true";

    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isChecked;
    checkbox.onchange = () => {
      localStorage.setItem(checkboxId, checkbox.checked);
      updateSummary();
    };

    const label = document.createElement("label");
    label.textContent = task;

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(label);
    checklistDiv.appendChild(taskDiv);
  });

  localStorage.setItem("currentDay", day);
  updateSummary();
  sendMotivationNotification();
}

function updateSummary() {
  let completed = 0;
  let start = Math.max(1, currentDay - 6);

  for (let d = start; d <= currentDay; d++) {
    for (let i = 0; i < staticChecklist.length; i++) {
      const checkboxId = `day${d}_task${i}`;
      if (localStorage.getItem(checkboxId) === "true") {
        completed++;
      }
    }
  }

  const advice = completed >= 50
    ? "🌟 You're doing great! Keep the momentum strong. May Allah increase your sincerity."
    : "📿 Keep going! Even a little consistent effort is beloved to Allah. Tomorrow is another chance.";

  document.getElementById("week-summary").textContent = advice;
}

function nextDay() {
  if (currentDay < 30) {
    currentDay++;
    loadChecklist(currentDay);
  }
}

function prevDay() {
  if (currentDay > 1) {
    currentDay--;
    loadChecklist(currentDay);
  }
}

function resetToday() {
  staticChecklist.forEach((_, index) => {
    const checkboxId = `day${currentDay}_task${index}`;
    localStorage.removeItem(checkboxId);
  });
  loadChecklist(currentDay);
}

// 🔔 Notification
function sendMotivationNotification() {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('🕌 Imaan Booster Reminder', {
      body: `Don't forget your goal today:\n"${dailyGoals[currentDay - 1]}"`,
      icon: 'https://cdn-icons-png.flaticon.com/512/616/616408.png'
    });
  }
}

function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
}

// Initial
requestNotificationPermission();
loadChecklist(currentDay);
