// Mock data generator for demo
export interface MockUser {
  id: number;
  name: string;
  designation: string;
  email: string;
  phone: string;
  age: number;
  salary: number;
  department: string;
  status: 'active' | 'inactive';
  joinDate: string;
  city: string;
}

const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'Robert', 'Lisa', 'William', 'Mary'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
const designations = ['Software Engineer', 'Senior Developer', 'Team Lead', 'Manager', 'Director', 'VP', 'Analyst', 'Coordinator', 'Specialist', 'Consultant'];
const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];

const generateMockUsers = (count: number = 100): MockUser[] => {
  const users: MockUser[] = [];
  
  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    users.push({
      id: i,
      name: `${firstName} ${lastName}`,
      designation: designations[Math.floor(Math.random() * designations.length)],
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      age: Math.floor(Math.random() * 40) + 25,
      salary: Math.floor(Math.random() * 100000) + 40000,
      department: departments[Math.floor(Math.random() * departments.length)],
      status: Math.random() > 0.3 ? 'active' : 'inactive',
      joinDate: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      city: cities[Math.floor(Math.random() * cities.length)],
    });
  }
  
  return users;
};

// Mock API implementation
export class MockAPI {
  private data: MockUser[];

  constructor() {
    this.data = generateMockUsers(100);
  }

  async fetchData(params: URLSearchParams): Promise<{ data: MockUser[]; total: number }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredData = [...this.data];

    // Universal search
    const search = params.get('search');
    if (search) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter(user =>
        user.id.toString().includes(searchLower) ||
        user.name.toLowerCase().includes(searchLower) ||
        user.designation.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.phone.includes(searchLower) ||
        user.age.toString().includes(searchLower) ||
        user.department.toLowerCase().includes(searchLower) ||
        user.status.toLowerCase().includes(searchLower)
      );
    }

    // Column filters
    const nameFilter = params.get('name');
    if (nameFilter) {
      filteredData = filteredData.filter(user =>
        user.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
        user.designation.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    const emailFilter = params.get('email');
    if (emailFilter) {
      filteredData = filteredData.filter(user =>
        user.email.toLowerCase().includes(emailFilter.toLowerCase())
      );
    }

    const departmentFilter = params.get('department');
    if (departmentFilter) {
      filteredData = filteredData.filter(user =>
        user.department.toLowerCase().includes(departmentFilter.toLowerCase())
      );
    }

    const statusFilter = params.get('status');
    if (statusFilter) {
      filteredData = filteredData.filter(user => user.status === statusFilter);
    }

    const cityFilter = params.get('city');
    if (cityFilter) {
      filteredData = filteredData.filter(user =>
        user.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }

    const phoneFilter = params.get('phone');
    if (phoneFilter) {
      filteredData = filteredData.filter(user =>
        user.phone.includes(phoneFilter)
      );
    }

    // Age range filter
    const ageMin = params.get('age_min');
    const ageMax = params.get('age_max');
    if (ageMin && ageMax) {
      filteredData = filteredData.filter(user =>
        user.age >= Number(ageMin) && user.age <= Number(ageMax)
      );
    }

    // Salary range filter
    const salaryMin = params.get('salary_min');
    const salaryMax = params.get('salary_max');
    if (salaryMin && salaryMax) {
      filteredData = filteredData.filter(user =>
        user.salary >= Number(salaryMin) && user.salary <= Number(salaryMax)
      );
    }

    // Date range filter
    const joinDateStart = params.get('joinDate_start');
    const joinDateEnd = params.get('joinDate_end');
    if (joinDateStart && joinDateEnd) {
      const startDate = new Date(joinDateStart);
      const endDate = new Date(joinDateEnd);
      filteredData = filteredData.filter(user => {
        const userDate = new Date(user.joinDate);
        return userDate >= startDate && userDate <= endDate;
      });
    }

    // Sorting
    const sortColumn = params.get('sortColumn');
    const sortDirection = params.get('sortDirection') || 'asc';
    if (sortColumn) {
      filteredData.sort((a, b) => {
        const aVal = a[sortColumn as keyof MockUser];
        const bVal = b[sortColumn as keyof MockUser];
        
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortDirection === 'asc' 
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        return 0;
      });
    }

    // Pagination
    const page = Number(params.get('page')) || 1;
    const pageSize = Number(params.get('pageSize')) || 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: filteredData.length,
    };
  }

  // Create a fetch function that mimics the real API
  createFetchFunction() {
    return async (url: string) => {
      const urlObj = new URL(url);
      const params = urlObj.searchParams;
      const result = await this.fetchData(params);
      
      return {
        ok: true,
        status: 200,
        json: async () => result,
      } as Response;
    };
  }
}

export const mockAPI = new MockAPI();
