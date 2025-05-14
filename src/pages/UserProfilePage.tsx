import { useAuth } from "../context/AuthContext";
import { Input } from "../components/Input";
import { useState } from "react";
import { Button } from "../components/Button";
import { toast } from "react-toastify";

interface UserProfilePageProps {
  onCloseProfile: () => void;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({
  onCloseProfile,
}) => {
  const { user, updateUser } = useAuth();
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    specialty?: string;
    city?: string;
    phone?: string;
    photo?: string;
  }>({});

  const [formData, setFormData] = useState({
    name: user?.name || "",
    specialty: user?.specialty || "",
    city: user?.city || "",
    phone: user?.phone || "",
    photo: user?.photo || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Phone number specific handling
 
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      specialty?: string;
      city?: string;
      phone?: string;
      photo?: string;
    } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // if (!formData.email.trim()) {
    //   newErrors.email = "Email is required";
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   newErrors.email = "Invalid email format";
    // }
    if (!formData.specialty.trim())
      newErrors.specialty = "Specialty is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const updatedData = {
      name: formData.name,
      //   email: formData.email,
      specialty: formData.specialty,
      city: formData.city,
      phone: formData.phone,
      photo: formData.photo,
      //   ...(formData.password && { password: formData.password }),
    };
    updateUser?.(updatedData);
    toast.success("Profile updated successfully!");
    onCloseProfile();
  };

  return (
    <>
      <div className="w-full bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-semibold text-white mb-6">Edit Profile</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Input
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          {/* 
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          /> */}

          <Input
            label="Specialty"
            name="specialty"
            type="text"
            value={formData.specialty}
            onChange={handleChange}
            error={errors.specialty}
          />

          <Input
            label="City"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
          />

          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />

          <Input
            label="Photo URL (optional)"
            name="photo"
            type="text"
            value={formData.photo}
            onChange={handleChange}
          />

          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" className="cursor-pointer">
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfilePage;
