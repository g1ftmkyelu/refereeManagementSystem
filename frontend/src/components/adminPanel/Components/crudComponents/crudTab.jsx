import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../../../../assets/tabs.css'
import Crud from '../coreComponents/Crud';

const CrudTab = ({ rdata }) => {
    return (

        <Tabs>
            <TabList>
                {
                    rdata.tabs.map(({ name, Icon }, index) => (
                        <Tab index={index}><h4><Icon />  {name}</h4></Tab>
                    ))
                }
            </TabList>
            {
                rdata.tabs.map(({ name }, index) => (
                    <TabPanel>
                        <h5>{name} {rdata.path}</h5>
                        <Crud                        
                        rdata={rdata}
                        stausCaption={name}

                        />
                        
                        </TabPanel>
                ))
            }

        </Tabs>

    );
}

export default CrudTab;
