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

import CityFilterContainer from '../Filters/CityFilter/CityFilterContainer';
import StateFilterContainer from '../Filters/StateFilter/StateFilterContainer';
import ZipCodeFilterContainer from '../Filters/ZipCodeFilter/ZipCodeFilterContainer';
import { TabsPanelComponentProps, TabComponent } from '../../ts_types';
import GeoLocationFilterContainer from '../Filters/GeoLocationFilter/GeoLocationFilterContainer';
import IntlMessages from '../common/IntlMessages';

const TabComponents = [
  {
    id: 1,
    tabComponentTitle: 'filters.title-city',
    tabComponent: CityFilterContainer
  },
  {
    id: 2,
    tabComponentTitle: 'filters.title-state',
    tabComponent: StateFilterContainer
  },
  {
    id: 3,
    tabComponentTitle: 'filters.title-zip-code',
    tabComponent: ZipCodeFilterContainer
  },
  {
    id: 4,
    tabComponentTitle: 'filters.title-geo-location',
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
                <IntlMessages id={tabComponent.tabComponentTitle} />
                {/* {tabComponent.tabComponentTitle} */}
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
