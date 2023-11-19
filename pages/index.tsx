import * as React from "react";
import SimpleDialogDemo from "@/components/SimpleDialogDemo";
import DataGridDemo from "@/components/DataGridDemo";
import DateTimeRangeDemo from "@/components/DateTimeRangeDemo";
import GestureDemo from "@/components/GestureDemo";
import EchartsDemo from "@/components/EchartsDemo";
import LodashDemo from "@/components/LodashDemo";
import AxiosDemo from "@/components/AxiosDemo";
import ReactHookFormDemo from "@/components/ReactHookFormDemo";
import ZustandDemo from "@/components/ZustandDemo";
import ReactHotkeysHookDemo from "@/components/ReactHotkeysHookDemo";

export default function Page() {
  return (
    <>
      <SimpleDialogDemo />;
      <DataGridDemo />;
      <DateTimeRangeDemo />;
      <GestureDemo />;
      <EchartsDemo />;
      <LodashDemo />;
      <AxiosDemo />;
      <ReactHookFormDemo />;
      <ZustandDemo />;
      <ReactHotkeysHookDemo />;
    </>
  );
}
