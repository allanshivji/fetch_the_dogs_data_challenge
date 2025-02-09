import { useState } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Container
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import CityFilterContainer from '../Filters/CityFilterContainer';
import StateFilterContainer from '../Filters/StateFilterContainer';
import ZipCodeFilterContainer from '../Filters/ZipCodeFilterContainer';
import { TabsPanelComponentProps, TabComponent } from '../../ts_types';
import GeoLocationFilterContainer from '../Filters/GeoLocationFilterContainer';

const TabComponents = [
  {
    id: 1,
    tabComponentTitle: 'City',
    tabComponent: CityFilterContainer
  },
  {
    id: 2,
    tabComponentTitle: 'State',
    tabComponent: StateFilterContainer
  },
  {
    id: 3,
    tabComponentTitle: 'Zip Code',
    tabComponent: ZipCodeFilterContainer
  },
  {
    id: 4,
    tabComponentTitle: 'Geo Location',
    tabComponent: GeoLocationFilterContainer
  }
];

const TabsPanelComponent = (props: TabsPanelComponentProps) => {
  const { setTempSelectedFilters, tempSelectedFilters } = props;

  const [activeTab, setActiveTab] = useState('1'); // Default active tab

  return (
    <Container className="mt-4">
      <Nav tabs>
        {TabComponents.map((tabComponent: TabComponent) => {
          return (
            <NavItem key={tabComponent.id}>
              <NavLink
                className={
                  activeTab === String(tabComponent.id) ? 'active' : ''
                }
                onClick={() => setActiveTab(String(tabComponent.id))}
              >
                {tabComponent.tabComponentTitle}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>

      <TabContent activeTab={activeTab} className="p-3 border">
        {TabComponents.map((tabComponent: TabComponent) => {
          return (
            <TabPane tabId={String(tabComponent.id)} key={tabComponent.id}>
              <tabComponent.tabComponent
                tempSelectedFilters={tempSelectedFilters}
                setTempSelectedFilters={setTempSelectedFilters}
              />
            </TabPane>
          );
        })}
      </TabContent>
    </Container>
  );
};

export default TabsPanelComponent;
