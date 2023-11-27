import Crud from "./Crud";
import Singleton from "../specialRenderComponents/singleton";
import ClickNShow from "../crudComponents/clickNShow";
import CrudGrid from "../crudComponents/crudGrid";
import CrudTab from "../crudComponents/crudTab";
import Home from "../specialRenderComponents/inputComponents/Home";
import DynamicWizard from '../specialRenderComponents/MyDynamicWizard';
import ReportRenderer from "../specialRenderComponents/ReportRenderer";
import MatchReportRender from '../specialRenderComponents/matchReportRender';
import Complaints from "../specialRenderComponents/Complaints";


function ResourceRender({ data }) {

  console.log(data);
  let componentToRender;

  switch (data.type) {
    case 'crud':
      componentToRender = <Crud rdata={data} />;
      break;
    case 'singleton':
      componentToRender = <Singleton rdata={data} />;
      break;
    case 'clickNshow':
      componentToRender = <ClickNShow rdata={data} />;
      break;
    case 'crudGrid':
      componentToRender = <CrudGrid rdata={data} numColumns={3} />;
      break;
    case 'crudTab':
      componentToRender = <CrudTab rdata={data} />;
      break;
    case 'wizard':
      componentToRender = <DynamicWizard rdata={data}/>;
      break;
    case 'report':
       componentToRender = <ReportRenderer rdata={data} />
    break;
    case 'matchreport':
      componentToRender = <MatchReportRender rdata={data} />
   break;
   case 'matchcomplaint':
    componentToRender = <Complaints rdata={data} />
 break;
    default:
      componentToRender = <Home metrics={data.metrics} />; // Render nothing if the type is not recognized
  }

  return (
    <div className="bg-gray-200 pt-6 w-full h-full">
      {componentToRender}
    </div>
  );
}

export default ResourceRender;
