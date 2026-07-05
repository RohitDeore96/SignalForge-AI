"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "Admin" | "Editor" | "Viewer";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  branding_color?: string;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  file_size: string;
  row_count: number;
  column_metadata: { name: string; type: "number" | "string" | "date" }[];
  data_preview: Record<string, any>[];
  created_at: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  references?: string[];
}

export interface ApiKeyItem {
  id: string;
  name: string;
  prefix: string;
  created_at: string;
  last_used: string;
}

interface AppContextType {
  user: Profile | null;
  organization: Organization;
  members: Profile[];
  datasets: Dataset[];
  selectedDataset: Dataset | null;
  notifications: NotificationItem[];
  apiKeys: ApiKeyItem[];
  chatHistory: ChatMessage[];
  commandPaletteOpen: boolean;
  
  // Actions
  setUser: (user: Profile | null) => void;
  updateOrganization: (name: string, brandingColor?: string) => void;
  addMember: (name: string, email: string, role: UserRole) => void;
  removeMember: (id: string) => void;
  changeMemberRole: (id: string, role: UserRole) => void;
  uploadDataset: (name: string, description: string, size: string, rows: number, cols: { name: string; type: "number" | "string" | "date" }[], preview: Record<string, any>[]) => void;
  deleteDataset: (id: string) => void;
  setSelectedDataset: (dataset: Dataset | null) => void;
  addNotification: (title: string, description: string, type?: NotificationItem["type"]) => void;
  clearNotifications: () => void;
  markNotificationAsRead: (id: string) => void;
  generateApiKey: (name: string) => void;
  deleteApiKey: (id: string) => void;
  addChatMessage: (text: string, sender: "user" | "ai", references?: string[]) => void;
  clearChat: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
}

const defaultOrg: Organization = {
  id: "sf-org-1",
  name: "SignalForge AI",
  slug: "signalforge-ai",
  branding_color: "#2563EB",
};

const defaultMembers: Profile[] = [
  { id: "usr-1", email: "alex.mercer@signalforge.ai", full_name: "Alex Mercer", role: "Admin" },
  { id: "usr-2", email: "sarah.chen@signalforge.ai", full_name: "Sarah Chen", role: "Editor" },
  { id: "usr-3", email: "marcus.vance@signalforge.ai", full_name: "Marcus Vance", role: "Viewer" },
];

const sampleDatasets: Dataset[] = [
  {
    id: "ds-sales",
    name: "Q2 Executive Sales Performance.csv",
    description: "North American enterprise sales data including recurring revenues, deal size, and conversion metrics.",
    file_size: "142 KB",
    row_count: 50,
    column_metadata: [
      { name: "Month", type: "date" },
      { name: "New Customers", type: "number" },
      { name: "Expansion ARR ($)", type: "number" },
      { name: "Churn ARR ($)", type: "number" },
      { name: "Average Deal Size ($)", type: "number" },
      { name: "Net Pipeline ($)", type: "number" },
    ],
    data_preview: [
      { "Month": "2026-01-01", "New Customers": 18, "Expansion ARR ($)": 45000, "Churn ARR ($)": -12000, "Average Deal Size ($)": 28000, "Net Pipeline ($)": 2800000 },
      { "Month": "2026-02-01", "New Customers": 22, "Expansion ARR ($)": 58000, "Churn ARR ($)": -8500, "Average Deal Size ($)": 31000, "Net Pipeline ($)": 3100000 },
      { "Month": "2026-03-01", "New Customers": 25, "Expansion ARR ($)": 62000, "Churn ARR ($)": -15000, "Average Deal Size ($)": 29000, "Net Pipeline ($)": 3400000 },
      { "Month": "2026-04-01", "New Customers": 31, "Expansion ARR ($)": 75000, "Churn ARR ($)": -6000, "Average Deal Size ($)": 35000, "Net Pipeline ($)": 4100000 },
      { "Month": "2026-05-01", "New Customers": 35, "Expansion ARR ($)": 88000, "Churn ARR ($)": -9000, "Average Deal Size ($)": 38000, "Net Pipeline ($)": 4800000 },
      { "Month": "2026-06-01", "New Customers": 42, "Expansion ARR ($)": 105000, "Churn ARR ($)": -11000, "Average Deal Size ($)": 41000, "Net Pipeline ($)": 5500000 },
    ],
    created_at: "2026-07-01T10:00:00Z",
  },
  {
    id: "ds-marketing",
    name: "SaaS Expansion Channels.xlsx",
    description: "Paid performance statistics across key growth platforms including Google Search, LinkedIn, and Meta Ads.",
    file_size: "88 KB",
    row_count: 36,
    column_metadata: [
      { name: "Channel", type: "string" },
      { name: "Spend ($)", type: "number" },
      { name: "Signups", type: "number" },
      { name: "Conversion %", type: "number" },
      { name: "CAC ($)", type: "number" },
    ],
    data_preview: [
      { "Channel": "Google Search", "Spend ($)": 12500, "Signups": 620, "Conversion %": 4.8, "CAC ($)": 20.1 },
      { "Channel": "LinkedIn Ads", "Spend ($)": 28000, "Signups": 450, "Conversion %": 2.2, "CAC ($)": 62.2 },
      { "Channel": "Meta Retargeting", "Spend ($)": 8500, "Signups": 380, "Conversion %": 5.1, "CAC ($)": 22.3 },
      { "Channel": "Sponsorships", "Spend ($)": 15000, "Signups": 180, "Conversion %": 1.8, "CAC ($)": 83.3 },
      { "Channel": "Organic Ref", "Spend ($)": 0, "Signups": 890, "Conversion %": 12.5, "CAC ($)": 0.0 },
    ],
    created_at: "2026-07-03T14:20:00Z",
  }
];

const defaultNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Dataset Analyzed Successfully",
    description: "Q2 Executive Sales Performance.csv metadata extracted with 6 columns detected.",
    time: "2 hours ago",
    read: false,
    type: "success",
  },
  {
    id: "notif-2",
    title: "System Integration",
    description: "Workspace setup successfully connected to Supabase Database.",
    time: "1 day ago",
    read: true,
    type: "info",
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [organization, setOrganization] = useState<Organization>(defaultOrg);
  const [members, setMembers] = useState<Profile[]>(defaultMembers);
  const [datasets, setDatasets] = useState<Dataset[]>(sampleDatasets);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(sampleDatasets[0]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(defaultNotifications);
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([
    { id: "key-1", name: "Production Analytics API", prefix: "sf_live_4a7b...", created_at: "2026-07-04T12:00:00Z", last_used: "2 minutes ago" }
  ]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: "m1",
      sender: "ai",
      text: "Hello! I am your SignalForge Data Assistant. I have analyzed **Q2 Executive Sales Performance.csv**. You can ask me to forecast expansion ARR, chart deal sizes, or summarize findings.",
      timestamp: "2026-07-05T18:00:00Z"
    }
  ]);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Sync auth profile on startup
  useEffect(() => {
    const cachedUser = localStorage.getItem("sf_user");
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    } else {
      // Default initial mock logged-in user
      const defaultUser = { id: "usr-1", email: "alex.mercer@signalforge.ai", full_name: "Alex Mercer", role: "Admin" as UserRole };
      setUser(defaultUser);
      localStorage.setItem("sf_user", JSON.stringify(defaultUser));
    }
  }, []);

  const updateOrganization = (name: string, brandingColor?: string) => {
    setOrganization((prev) => {
      const updated = { ...prev, name, branding_color: brandingColor || prev.branding_color };
      addNotification("Organization Updated", `Name updated to "${name}" successfully.`, "success");
      return updated;
    });
  };

  const addMember = (name: string, email: string, role: UserRole) => {
    const newMember: Profile = {
      id: `usr-${Date.now()}`,
      email,
      full_name: name,
      role,
    };
    setMembers((prev) => [...prev, newMember]);
    addNotification("Member Invited", `${name} (${email}) has been added as a ${role}.`, "success");
  };

  const removeMember = (id: string) => {
    const member = members.find((m) => m.id === id);
    if (member) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
      addNotification("Member Removed", `${member.full_name} has been removed.`, "warning");
    }
  };

  const changeMemberRole = (id: string, role: UserRole) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role } : m))
    );
    addNotification("Role Changed", `Permissions updated to ${role}.`, "info");
  };

  const uploadDataset = (name: string, description: string, size: string, rows: number, cols: { name: string; type: "number" | "string" | "date" }[], preview: Record<string, any>[]) => {
    const newDataset: Dataset = {
      id: `ds-${Date.now()}`,
      name,
      description: description || "Uploaded user dataset analytics",
      file_size: size,
      row_count: rows,
      column_metadata: cols,
      data_preview: preview,
      created_at: new Date().toISOString(),
    };
    setDatasets((prev) => [newDataset, ...prev]);
    setSelectedDataset(newDataset);
    addNotification("Dataset Uploaded", `"${name}" loaded containing ${rows} rows.`, "success");
  };

  const deleteDataset = (id: string) => {
    const dataset = datasets.find((d) => d.id === id);
    setDatasets((prev) => prev.filter((d) => d.id !== id));
    if (selectedDataset?.id === id) {
      const remaining = datasets.filter((d) => d.id !== id);
      setSelectedDataset(remaining.length > 0 ? remaining[0] : null);
    }
    if (dataset) {
      addNotification("Dataset Deleted", `"${dataset.name}" has been removed.`, "warning");
    }
  };

  const addNotification = (title: string, description: string, type: NotificationItem["type"] = "info") => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      description,
      time: "Just now",
      read: false,
      type,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const generateApiKey = (name: string) => {
    const randHex = Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    const newKey: ApiKeyItem = {
      id: `key-${Date.now()}`,
      name,
      prefix: `sf_live_${randHex.slice(0, 4)}...${randHex.slice(-4)}`,
      created_at: new Date().toISOString(),
      last_used: "Never",
    };
    setApiKeys((prev) => [...prev, newKey]);
    addNotification("API Key Created", `"${name}" generated successfully.`, "success");
  };

  const deleteApiKey = (id: string) => {
    setApiKeys((prev) => prev.filter((k) => k.id !== id));
    addNotification("API Key Revoked", "API access key revoked.", "warning");
  };

  const addChatMessage = (text: string, sender: "user" | "ai", references?: string[]) => {
    const newMessage: ChatMessage = {
      id: `m-${Date.now()}`,
      sender,
      text,
      timestamp: new Date().toISOString(),
      references,
    };
    setChatHistory((prev) => [...prev, newMessage]);
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        organization,
        members,
        datasets,
        selectedDataset,
        notifications,
        apiKeys,
        chatHistory,
        commandPaletteOpen,
        setUser,
        updateOrganization,
        addMember,
        removeMember,
        changeMemberRole,
        uploadDataset,
        deleteDataset,
        setSelectedDataset,
        addNotification,
        clearNotifications,
        markNotificationAsRead,
        generateApiKey,
        deleteApiKey,
        addChatMessage,
        clearChat,
        setCommandPaletteOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
