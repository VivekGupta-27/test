import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, User, Bell, Shield, Palette, HelpCircle, FileText } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const settingsGroups = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Profile Information", href: "#", type: "link" },
      { icon: Shield, label: "Security & Password", href: "#", type: "link" },
    ]
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", type: "toggle", value: true },
      { icon: Palette, label: "Dark Mode", type: "toggle", value: false },
    ]
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help & FAQ", href: "#", type: "link" },
      { icon: FileText, label: "Terms of Service", href: "#", type: "link" },
    ]
  }
];

export default function Settings() {
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 md:p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account preferences and configurations.</p>
        </div>

        <div className="max-w-2xl space-y-8">
          {settingsGroups.map((group, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground px-1">{group.title}</h2>
              <Card className="border-border/50 shadow-sm overflow-hidden">
                <CardContent className="p-0 divide-y divide-border/40">
                  {group.items.map((item, itemIdx) => (
                    <div 
                      key={itemIdx} 
                      className="flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-foreground/70">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-sm text-foreground">{item.label}</span>
                      </div>
                      
                      {item.type === "link" ? (
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Switch defaultChecked={item.value} />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}

          <div className="pt-4">
             <Button variant="destructive" className="w-full sm:w-auto">
               Delete Account
             </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
