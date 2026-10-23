const ProfileAvatarUpload = () => {
  return (
    <>
      <div className="size-16 rounded-xl ring-1 ring-border bg-card object-cover"></div>
      <div>
        <button className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary transition-colors">
          画像を変更
        </button>
        <p className="text-xs text-muted-foreground">5MB以下の画像</p>
      </div>
    </>
  );
};

export default ProfileAvatarUpload;
