import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import FormChangeName from "../form/change-name";
import FormChangeEmail from "../form/change-email";
import FormUpdatePassword from "../form/update-password";

const TabSetting = () => {
  return (
    <Tabs defaultValue="tab-1" className="items-center w-full">
      <div className="flex justify-start items-center w-full">
        <TabsList className="text-foreground h-auto gap-2 rounded-none bg-transparent  px-0 py-1 ">
          <TabsTrigger
            value="tab-1"
            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            privacy
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            password
          </TabsTrigger>
          <TabsTrigger
            value="tab-3"
            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            another
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="tab-1" className="space-y-4 w-full">
        <FormChangeName />
        <FormChangeEmail />
      </TabsContent>
      <TabsContent value="tab-2" className="w-full">
        <FormUpdatePassword />
      </TabsContent>
      <TabsContent value="tab-3">
        <p className="text-muted-foreground p-4 text-center text-xs">
          Content for Tab 3
        </p>
      </TabsContent>
    </Tabs>
  );
};

export default TabSetting;
