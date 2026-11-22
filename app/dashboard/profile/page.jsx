import { getSession } from "@/lib/session";
import { ProfileForm } from "@/components/profile-form";

export default async function ProfilePage() {
  const session = await getSession();
  const { name, email, image, role, businessName, subscriptionPlan } =
    session.user;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold">Profile Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Update your name, photo and restaurant details.
        </p>
      </div>
      <ProfileForm
        user={{ name, email, image, role, businessName, subscriptionPlan }}
      />
    </div>
  );
}
