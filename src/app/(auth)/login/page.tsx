"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  return (
    <AuthLayout>
      <div className="my-auto p-4">
        <Card title="Login">
          <p className="mb-4 text-sm text-gray-600">
            Select your profile to continue
          </p>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => router.push("/onboarding")}
          >
            Go to Login
          </Button>
        </Card>
      </div>
    </AuthLayout>
  );
}
