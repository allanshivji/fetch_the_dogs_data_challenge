import { FC, useState, ReactNode } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CityAndStateFilters from "../Filters/CityAndStateFilters";
import ZipCodeFilter from "../Filters/ZipCodeFilter";
import GeoLocationFilter from "../Filters/GeoLocationFilter";

interface TabsPanelComponentProps {
  handleAllZipCodes: (zipCodes: string[]) => void;
}

interface TabComponent {
  id: number;
  tabComponentTitle: string;
  tabComponent: FC<{ handleAllZipCodes: (zipCodes: string[]) => void }>
}

const TabComponents = [
  {
    id: 1,
    tabComponentTitle: 'City and State',
    tabComponent: CityAndStateFilters
  },
  {
    id: 2,
    tabComponentTitle: 'Zip Code',
    tabComponent: ZipCodeFilter
  },
  {
    id: 3,
    tabComponentTitle: 'Geo Location',
    tabComponent: GeoLocationFilter
  }
]

const TabsPanelComponent: FC<TabsPanelComponentProps> = ({ handleAllZipCodes }) => {

  const [activeTab, setActiveTab] = useState("1"); // Default active tab

  return (
    <Container className="mt-4">
      {/* Tab Navigation */}
      <Nav tabs>
        {TabComponents.map((tabComponent: TabComponent) => {
          return (
            <NavItem key={tabComponent.id}>
              <NavLink className={activeTab === String(tabComponent.id) ? "active" : ""} onClick={() => setActiveTab(String(tabComponent.id))}>
                {tabComponent.tabComponentTitle}
              </NavLink>
            </NavItem>
          )
        })}
      </Nav>

      {/* Tab Content */}
      <TabContent activeTab={activeTab} className="p-3 border">
        {TabComponents.map((tabComponent: TabComponent) => {
          return (
            <TabPane tabId={String(tabComponent.id)} key={tabComponent.id}>
                <tabComponent.tabComponent handleAllZipCodes={handleAllZipCodes} />
            </TabPane>
          )
        })}
      </TabContent>
    </Container>
  );
}

export default TabsPanelComponent;