import { Dropdown } from 'react-bootstrap';
import CompanyDetails from './CompanyDetails'
import image1 from '../../assets/images/companies/amazon.png';
import image2 from '../../assets/images/companies/apple.png';
import image3 from '../../assets/images/companies/google.png';


interface CompanyInfoItems {
    id: number;
    logo: string;
    name: string;
    location: string;
    event: string;
    date: string;
    status: string;
}

const companyInfo: CompanyInfoItems[] = [
    {
        id: 1,
        logo: image1,
        name: 'Amazon Inc.',
        location: 'Seattle, Washington',
        event: 'Ecommerce',
        date: 'October 22, 2022',
        status: 'Hot',
    },
    {
        id: 2,
        logo: image2,
        name: 'Apple Inc.',
        location: 'Cupertino, California',
        event: 'Ecommerce',
        date: 'October 22, 2022',
        status: 'Cold',
    },
    {
        id: 3,
        logo: image3,
        name: 'Google LLC',
        location: 'Menlo Park, California',
        event: 'Ecommerce',
        date: 'October 22, 2022',
        status: 'In-progress',
    }
    
];

const DashboardUpcomingEvents = () => {

    
    return (
        <>
            <>
                <>
                    <Dropdown className="float-end" align="end">
                        <Dropdown.Toggle as="a" className="card-drop cursor-pointer">
                            <i className="mdi mdi-dots-vertical"></i>
                        </Dropdown.Toggle>
                        
                    </Dropdown>

                    <h4 className="header-title mb-3">Upcoming Event</h4>
                    <CompanyDetails companyInfo={companyInfo} />
                </>
            </>
        </>
    );
};

export default DashboardUpcomingEvents;
