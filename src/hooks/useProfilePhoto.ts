import { useEffect, useState } from "react";
import { useGraphAccessToken } from "./useAccessToken";

export function useProfilePhoto() {
  const getToken = useGraphAccessToken();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      const token = await getToken();
      if (!token) {
        setPhotoUrl(null);
        return;
      }
      try {
        const res = await fetch(
          "https://graph.microsoft.com/v1.0/me/photo/$value",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          const blob = await res.blob();
          setPhotoUrl(URL.createObjectURL(blob));
        } else {
          setPhotoUrl(null);
        }
      } catch {
        setPhotoUrl(null);
      }
    };
    fetchPhoto();
  }, [getToken]);

  return photoUrl;
}
