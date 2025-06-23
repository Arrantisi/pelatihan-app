import TabSetting from "../tabs/setting";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const DialogSettingAccount = () => {
  return (
    <DialogContent className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>Setting</DialogTitle>
        <DialogDescription className="sr-only">
          Kelola informasi profil, keamanan, privasi, dan preferensi akun Anda
          di satu tempat.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col justify-center items-center space-y-4">
        <TabSetting />
      </div>
    </DialogContent>
  );
};

export default DialogSettingAccount;
