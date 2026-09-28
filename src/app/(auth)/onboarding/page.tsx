"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { UserSelection } from "@/components/business/UserSelection";
import { PinInput } from "@/components/business/PinInput";
import { Loading } from "@/components/ui/Loading";
import { useAuth } from "@/hooks/useAuth";
import { seedDatabase } from "@/db/seed";
import type { User } from "@/db/schema";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading, login } = useAuth();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSeeding, setIsSeeding] = useState(true);

  useEffect(() => {
    seedDatabase().finally(() => setIsSeeding(false));
  }, []);

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || isSeeding) return <Loading message="Loading..." />;

  const handlePinSuccess = async (userId: string) => {
    const success = await login(userId);
    if (success) router.push("/dashboard");
  };

  return (
    <AuthLayout>
      {!selectedUser ? (
        <UserSelection onSelect={setSelectedUser} />
      ) : (
        <PinInput user={selectedUser} onSuccess={handlePinSuccess} onBack={() => setSelectedUser(null)} />
      )}
    </AuthLayout>
  );
}
