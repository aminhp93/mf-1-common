// export default function Home() {
//   return <div>Common 3</div>;
// }

import * as React from "react";
// import Button from "@mui/material/Button";
import SimpleDialogDemo from "@/components/SimpleDialogDemo";
import DataGridDemo from "@/components/DataGridDemo";
import DateTimeRangeDemo from "@/components/DateTimeRangeDemo";
import GestureDemo from "@/components/GestureDemo";

export default function ButtonUsage() {
  return (
    <>
      <SimpleDialogDemo />;
      <DataGridDemo />;
      <DateTimeRangeDemo />;
      <GestureDemo />;
    </>
  );
}
