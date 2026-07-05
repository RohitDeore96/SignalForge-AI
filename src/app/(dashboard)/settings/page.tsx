"use client";

import React, { useState } from "react";
import { useApp, UserRole } from "@/lib/context";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { 
  Settings, 
  Users, 
  Key, 
  Bell, 
  Plus, 
  Trash2, 
  Shield, 
  Check, 
  Copy,
  Layout,
  UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
  const { 
    organization, 
    members, 
    apiKeys, 
    updateOrganization, 
    addMember, 
    removeMember, 
    changeMemberRole, 
    generateApiKey, 
    deleteApiKey,
    addNotification 
  } = useApp();

  const [activeTab, setActiveTab] = useState<"org" | "members" | "api" | "notifications">("org");

  // Org branding states
  const [orgName, setOrgName] = useState(organization.name);
  const [brandColor, setBrandColor] = useState(organization.branding_color || "#2563EB");

  // Invite member Dialog modal states
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<UserRole>("Viewer");

  // Generate API key Dialog states
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [generatedKeyVisible, setGeneratedKeyVisible] = useState("");

  // Notification checkboxes
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(false);
  const [digestAlerts, setDigestAlerts] = useState(true);

  const handleUpdateOrg = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrganization(orgName, brandColor);
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;
    addMember(inviteName, inviteEmail, inviteRole);
    setInviteName("");
    setInviteEmail("");
    setInviteRole("Viewer");
    setIsInviteOpen(false);
  };

  const handleCreateApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyName) return;
    
    // Generate actual live key representation
    const hex = Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    const liveKey = `sf_live_${hex}`;
    
    generateApiKey(keyName);
    setGeneratedKeyVisible(liveKey);
    setKeyName("");
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(generatedKeyVisible);
    addNotification("API Key Copied", "Token copied to clipboard successfully.", "success");
    setIsKeyModalOpen(false);
    setGeneratedKeyVisible("");
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title */}
      <div>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-charcoal">
          Settings
        </h2>
        <p className="text-xs text-brand-stone mt-1.5">
          Manage workspace profile settings, branding color accents, API keys, and team member permissions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Navigation Tabs */}
        <div className="md:col-span-1 flex flex-col space-y-1.5 select-none text-left">
          {[
            { id: "org", label: "Organization & Branding", icon: <Layout className="w-4 h-4" /> },
            { id: "members", label: "Members & RBAC", icon: <Users className="w-4 h-4" /> },
            { id: "api", label: "API Keys & Integrations", icon: <Key className="w-4 h-4" /> },
            { id: "notifications", label: "Notification Channels", icon: <Bell className="w-4 h-4" /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2.5 px-3 py-2 text-xs font-medium rounded-lg relative transition-all duration-150 text-left ${
                  isActive ? "text-brand-charcoal font-semibold" : "text-brand-stone hover:text-brand-charcoal"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-settings-tab"
                    className="absolute inset-0 bg-brand-softGray rounded-lg z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 shrink-0">{tab.icon}</span>
                <span className="relative z-10 truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents Panels */}
        <div className="md:col-span-3">
          <AnimatePresence mode="wait">
            
            {/* Organization Branding */}
            {activeTab === "org" && (
              <motion.div
                key="org"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.18 }}
              >
                <Card className="text-left">
                  <CardHeader>
                    <CardTitle className="text-base">Branding & Profiles</CardTitle>
                    <CardDescription>Customize active workspace parameters</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateOrg} className="space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-serif uppercase tracking-wider text-brand-stone">Organization Name</label>
                        <input
                          value={orgName}
                          onChange={(e) => setOrgName(e.target.value)}
                          type="text"
                          className="w-full max-w-md bg-background border border-border rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-brand-blue font-medium"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-serif uppercase tracking-wider text-brand-stone">Theme Accent Color</label>
                        <div className="flex items-center space-x-3.5 mt-1">
                          {[
                            { name: "Premium Blue", val: "#2563EB" },
                            { name: "Charcoal Slate", val: "#1C1917" },
                            { name: "Stone Gray", val: "#78716C" },
                          ].map((col) => (
                            <button
                              key={col.val}
                              type="button"
                              onClick={() => setBrandColor(col.val)}
                              className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${
                                brandColor === col.val ? "scale-110 ring-2 ring-offset-2 ring-neutral-900" : ""
                              }`}
                              style={{ backgroundColor: col.val }}
                              title={col.name}
                            >
                              {brandColor === col.val && (
                                <Check className="w-3.5 h-3.5 text-white" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Brand preview lockup */}
                      <div className="border border-border rounded-xl p-4 bg-brand-offWhite max-w-md">
                        <span className="text-[9px] font-serif uppercase tracking-wider text-brand-stone block mb-3">Footer branding preview</span>
                        <div className="flex items-center justify-between text-[10px] text-brand-stone font-medium">
                          <span>© 2026 {orgName}.</span>
                          <span className="flex items-center space-x-1">
                            <span>Built by</span>
                            <span className="font-serif font-extrabold text-neutral-800 tracking-tight">KrissDevHub Technologies</span>
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="accent"
                        type="submit"
                        className="text-xs py-2 bg-brand-charcoal hover:bg-neutral-800 text-white border-brand-charcoal"
                      >
                        Save Configuration
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Members & RBAC */}
            {activeTab === "members" && (
              <motion.div
                key="members"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-lg font-semibold text-brand-charcoal text-left">Workspace Team</h3>
                  <Button
                    variant="accent"
                    size="sm"
                    className="text-xs"
                    onClick={() => setIsInviteOpen(true)}
                  >
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Invite User
                  </Button>
                </div>

                <Card className="text-left">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left min-w-[500px]">
                        <thead>
                          <tr className="bg-brand-offWhite border-b border-border select-none">
                            <th className="p-3 font-semibold text-brand-charcoal">Name</th>
                            <th className="p-3 font-semibold text-brand-charcoal">Role</th>
                            <th className="p-3 font-semibold text-brand-charcoal">Email Address</th>
                            <th className="p-3 font-semibold text-brand-charcoal text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {members.map((mem) => (
                            <tr key={mem.id} className="hover:bg-neutral-50 transition-colors">
                              <td className="p-3 font-medium text-brand-charcoal">{mem.full_name}</td>
                              <td className="p-3">
                                <select
                                  value={mem.role}
                                  onChange={(e) => changeMemberRole(mem.id, e.target.value as UserRole)}
                                  className="bg-transparent font-semibold text-brand-stone hover:text-brand-charcoal outline-none cursor-pointer text-xs"
                                >
                                  <option value="Admin">Admin</option>
                                  <option value="Editor">Editor</option>
                                  <option value="Viewer">Viewer</option>
                                </select>
                              </td>
                              <td className="p-3 font-mono text-[10px] text-brand-stone">{mem.email}</td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => removeMember(mem.id)}
                                  className="w-7 h-7 inline-flex items-center justify-center rounded hover:bg-red-50 text-brand-stone hover:text-brand-rose transition-colors duration-150"
                                  title="Revoke access"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* API Keys */}
            {activeTab === "api" && (
              <motion.div
                key="api"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-lg font-semibold text-brand-charcoal text-left">Developer API Access</h3>
                  <Button
                    variant="accent"
                    size="sm"
                    className="text-xs"
                    onClick={() => { setIsKeyModalOpen(true); setGeneratedKeyVisible(""); }}
                  >
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Create Key
                  </Button>
                </div>

                <Card className="text-left">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left min-w-[500px]">
                        <thead>
                          <tr className="bg-brand-offWhite border-b border-border select-none">
                            <th className="p-3 font-semibold text-brand-charcoal">Description</th>
                            <th className="p-3 font-semibold text-brand-charcoal">Prefix</th>
                            <th className="p-3 font-semibold text-brand-charcoal">Created</th>
                            <th className="p-3 font-semibold text-brand-charcoal">Last Used</th>
                            <th className="p-3 font-semibold text-brand-charcoal text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {apiKeys.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="p-8 text-center text-xs text-brand-stone">
                                No active API keys compiled.
                              </td>
                            </tr>
                          ) : (
                            apiKeys.map((k) => (
                              <tr key={k.id} className="hover:bg-neutral-50 transition-colors">
                                <td className="p-3 font-medium text-brand-charcoal">{k.name}</td>
                                <td className="p-3 font-mono text-[10px] text-brand-stone">{k.prefix}</td>
                                <td className="p-3 text-[10px] text-brand-stone">{new Date(k.created_at).toLocaleDateString()}</td>
                                <td className="p-3 text-[10px] text-brand-stone">{k.last_used}</td>
                                <td className="p-3 text-right">
                                  <button
                                    onClick={() => deleteApiKey(k.id)}
                                    className="w-7 h-7 inline-flex items-center justify-center rounded hover:bg-red-50 text-brand-stone hover:text-brand-rose transition-colors duration-150"
                                    title="Revoke credential key"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Notification settings */}
            {activeTab === "notifications" && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.18 }}
              >
                <Card className="text-left">
                  <CardHeader>
                    <CardTitle className="text-base">System Notification Channels</CardTitle>
                    <CardDescription>Toggle alerts and webhook options</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {/* Email alerts */}
                      <label className="flex items-start space-x-3.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={emailAlerts}
                          onChange={(e) => setEmailAlerts(e.target.checked)}
                          className="w-4 h-4 mt-0.5 border-border text-brand-blue focus:ring-brand-blue rounded"
                        />
                        <div>
                          <span className="text-xs font-semibold text-brand-charcoal block">Email Alerts</span>
                          <span className="text-[10px] text-brand-stone">Receive daily accuracy drift alerts of forecasting regressions.</span>
                        </div>
                      </label>

                      {/* Slack webhooks */}
                      <label className="flex items-start space-x-3.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={slackAlerts}
                          onChange={(e) => setSlackAlerts(e.target.checked)}
                          className="w-4 h-4 mt-0.5 border-border text-brand-blue focus:ring-brand-blue rounded"
                        />
                        <div>
                          <span className="text-xs font-semibold text-brand-charcoal block">Slack Webhook integrations</span>
                          <span className="text-[10px] text-brand-stone">Push executive insights automatically to workspace channels.</span>
                        </div>
                      </label>

                      {/* Digests */}
                      <label className="flex items-start space-x-3.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={digestAlerts}
                          onChange={(e) => setDigestAlerts(e.target.checked)}
                          className="w-4 h-4 mt-0.5 border-border text-brand-blue focus:ring-brand-blue rounded"
                        />
                        <div>
                          <span className="text-xs font-semibold text-brand-charcoal block">Weekly Decision Digests</span>
                          <span className="text-[10px] text-brand-stone">Receive a summarized report doc compiled over connected nodes.</span>
                        </div>
                      </label>
                    </div>

                    <div className="border-t border-border pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          addNotification("Alert Test Triggered", "System notifications are fully functional.", "success");
                        }}
                        className="text-[10px]"
                      >
                        Fire Test Alert notification
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* Invite Member Dialog modal */}
      <Dialog
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        title="Invite New Workspace Node Member"
        description="Invited members will receive email credentials to join the organization."
      >
        <form onSubmit={handleInviteSubmit} className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-[10px] font-serif uppercase tracking-wider text-brand-stone">Full Name</label>
            <input
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              placeholder="Sarah Chen"
              type="text"
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-xs outline-none focus:ring-1 focus:ring-brand-blue font-medium"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-serif uppercase tracking-wider text-brand-stone">Email Address</label>
            <input
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="sarah@signalforge.ai"
              type="email"
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-xs outline-none focus:ring-1 focus:ring-brand-blue font-medium"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-serif uppercase tracking-wider text-brand-stone">RBAC Role Allocation</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as UserRole)}
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-xs outline-none focus:ring-1 focus:ring-brand-blue font-medium"
            >
              <option value="Admin">Admin (Full Control)</option>
              <option value="Editor">Editor (Can Upload & Forecast)</option>
              <option value="Viewer">Viewer (Read-only reports)</option>
            </select>
          </div>

          <div className="flex items-center space-x-3 pt-3">
            <Button
              variant="outline"
              type="button"
              className="flex-1 text-xs"
              onClick={() => setIsInviteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="accent"
              type="submit"
              className="flex-1 text-xs bg-brand-charcoal hover:bg-neutral-800 text-white border-brand-charcoal"
            >
              Send Invitation
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Generate API Key Dialog modal */}
      <Dialog
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        title="Generate Access API Token"
        description="Configure API metrics calls."
      >
        <AnimatePresence mode="wait">
          {!generatedKeyVisible ? (
            <form onSubmit={handleCreateApiKeySubmit} className="space-y-4 text-left" key="form">
              <div className="space-y-1.5">
                <label className="text-[10px] font-serif uppercase tracking-wider text-brand-stone">Token Name / Description</label>
                <input
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  placeholder="Production Analytics API key"
                  type="text"
                  className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-xs outline-none focus:ring-1 focus:ring-brand-blue font-medium"
                  required
                />
              </div>

              <div className="flex items-center space-x-3 pt-3">
                <Button
                  variant="outline"
                  type="button"
                  className="flex-1 text-xs"
                  onClick={() => setIsKeyModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="accent"
                  type="submit"
                  className="flex-1 text-xs bg-brand-charcoal hover:bg-neutral-800 text-white border-brand-charcoal"
                >
                  Generate Token
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-left" key="visible">
              <div className="bg-amber-50 border border-amber-200 text-amber-800 text-[10px] rounded-lg p-3 leading-relaxed">
                <strong>Attention:</strong> Copy this API credential key token now. For safety, it won't be shown again.
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-serif uppercase tracking-wider text-brand-stone">Generated Token Key</label>
                <div className="flex items-center space-x-2.5">
                  <input
                    readOnly
                    value={generatedKeyVisible}
                    type="text"
                    className="w-full bg-brand-offWhite border border-border rounded-lg px-3 py-2.5 text-xs outline-none font-mono text-brand-charcoal"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyKey}
                    className="w-10 h-10 shrink-0"
                    title="Copy token to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full text-xs"
                onClick={handleCopyKey}
              >
                Close & Proceed
              </Button>
            </div>
          )}
        </AnimatePresence>
      </Dialog>
    </div>
  );
}
