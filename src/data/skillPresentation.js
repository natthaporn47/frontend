import { skillGroups, tools } from "./skills";

const toolGroup = { title: "Tools & Platforms", description: "เครื่องมือและแพลตฟอร์มที่ใช้ในการพัฒนางาน", icons: tools.map(([label, icon]) => [label === "Visual Studio Code" ? "VS Code" : label, label === "Arduino IDE" ? "devicon:arduino" : icon]), color: "mint" };

export const presentedSkillGroups = [
  { ...skillGroups[0], description: "พัฒนาเว็บไซต์และส่วนติดต่อผู้ใช้งาน", icons: skillGroups[0].icons.map(([label, icon]) => [label === "React.js" ? "React" : label, label === "HTML" ? "vscode-icons:file-type-html" : label === "CSS" ? "thesvg-color:css" : icon]), area: "frontend", symbol: "tabler:device-imac-code" },
  { ...skillGroups[2], description: "พัฒนา Mobile Application\nทั้ง Android และ iOS", area: "mobile", symbol: "heroicons:device-phone-mobile" },
  { ...skillGroups[1], area: "backend", symbol: "bi:database" },
  { ...toolGroup, area: "tools", symbol: "heroicons:wrench" },
  { ...skillGroups[3], description: "การพัฒนาและใช้งานอุปกรณ์ IoT", icons: [["ESP32", "mdi:chip"], ["Arduino uno", "devicon:arduino"], ["DHT22", "ic:round-device-thermostat"], ["Raspberry Pi", "logos:raspberry-pi"], ["MQTT", "selfhst:mqtt"], ["Node-RED", "selfhst:node-red"]], area: "iot", symbol: "ion:hardware-chip-outline" },
];

export const displaySkillIcons = { Flutter: "logos:flutter-icon", Firebase: "logos:firebase-icon", Supabase: "logos:supabase-icon" };
