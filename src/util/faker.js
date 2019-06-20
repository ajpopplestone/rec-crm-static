var faker = require('faker/locale/en_GB');
faker.seed(141)
var Postcodes = require('./postcodes');
var CompanyNames = require('./companyNames');


const Data = {
    roles: ["", "Packer", "Gardener", "HGV Driver", "Builder", "Waiter", "Stunt Performer", "Bar Man", "Admin", "Dentist"],
    
    candStatuses: ["", "Live", "Raw", "Live Temp", "On Hold", "Found Job"],
    
    clientStatuses: ["", "Live", "Prospect", "Unpaid", "On Hold", "Top Client"],
    
    consultants: ["", "AP", "GE", "MI", "DB", "DRB", "MP"],
    
    busTypes: ["", "e-commerce", "networks", "action-items", "partnerships", "architecture", "systems", "experiences"],
    
    generateUID(i, length) {
            var my_string = '' + i;
            while (my_string.length < length) {
                my_string = '0' + my_string;
            }
        
            return my_string;
    },
    
    generatePostcode(type) {
        let random = Math.floor(Math.random() * Postcodes.Postcodes[type].length);
        let postcode = Postcodes.Postcodes[type][random];
        Postcodes.Postcodes[type].splice(random, 1)
        return postcode;
    },

    
    generateStatus(statuses) {
        let status = statuses[Math.floor(Math.random() * (statuses.length - 1)) + 1]
        return status
    },
    
    generateRole() {
        let role = this.roles[Math.floor(Math.random() * (this.roles.length - 1)) + 1]
        return role
    },
    
    generateConsultant() {
        let consultant = this.consultants[Math.floor(Math.random() * (this.consultants.length - 1)) + 1]
        return consultant
    },
    
    generateCompanyName() {
        let random = Math.floor(Math.random() * CompanyNames.Names.length);
        let name = CompanyNames.Names[random];
        return name
    },
    
    generateCandEmail(forename, surname) {
        const modifiers = ['_', '.', '-']
        const domains = ['@yahoo.com', '@gmail.com', '@hotmail.com', '@outlook.com']
        let email = `${forename}${modifiers[Math.floor(Math.random() * modifiers.length)]}${surname}${domains[Math.floor(Math.random() * domains.length)]}`
        return email
    },
    
    generateCandidates(total) {
        let candidates = []
        for(var i = 0; i < total; i++) {
            let forename = faker.name.firstName()
            let surname = faker.name.lastName()
            var person = {
                    UID: this.generateUID(i+1, 4),
                    forename: forename, 
                    surname: surname, 
                    status: this.generateStatus(Data.candStatuses), 
                    email: this.generateCandEmail(forename, surname),
                    telephone: faker.phone.phoneNumber(), 
                    consultant: this.generateConsultant(), 
                    roleCode: this.generateRole(),
                    address: `${Math.floor(Math.random() * 100) + 1}, ${faker.address.streetName()}, ${faker.address.city()}, ${faker.address.county()}`
            }
            
            var location = this.generatePostcode('candidates')
            location.distance = '';
            
            candidates.push({...person, ...location})
        }
        return candidates
    },
    
    
    generateClients(total) {
        let clients = []
        for(var i = 0; i < total; i++) {
            let name = this.generateCompanyName()
            var client = {
                    UID: this.generateUID(i+1, 4),
                    name: name, 
                    status: this.generateStatus(Data.clientStatuses), 
                    email: `info@${name}.com`.replace(/ /g,''),
                    website: `www.${name}.com`.replace(/ /g,''),
                    telephone: faker.phone.phoneNumber(), 
                    consultant: this.generateConsultant(), 
                    businessType: faker.company.bsNoun(),
                    address: `${Math.floor(Math.random() * 100) + 1}, ${faker.address.streetName()}, ${faker.address.city()}, ${faker.address.county()}`
            }
            
            var location = this.generatePostcode('clients')
            location.distance = '';
            
            clients.push({...client, ...location})
        }
        return clients
    },
    
    
    // candidates: [
        
    // ]
}



export default Data;
