/**
 * Shared physical locations for the whole organization.
 * Every business in the prototype operates from this same set of three sites.
 */
import map1 from '../assets/map-1.png'
import map2 from '../assets/map-2.png'
import map3 from '../assets/map-3.png'

export const SHARED_ORG_LOCATIONS = [
  {
    id: 'brookhaven',
    name: 'Brookhaven',
    address: '3100 Lanier Dr NE, Atlanta, GA 30319',
    phone: '(404) 555-0123',
    hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm',
    map: map1
  },
  {
    id: 'ansley-park',
    name: 'Ansley Park',
    address: '149 Peachtree Cir NE, Atlanta, GA 30309',
    phone: '(404) 555-0456',
    hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm',
    map: map2
  },
  {
    id: 'virginia-highland',
    name: 'Virginia-Highland',
    address: '1034 N Highland Ave NE, Atlanta, GA 30306',
    phone: '(404) 555-0789',
    hours: 'Mon-Fri 8am-8pm, Sat-Sun 9am-6pm',
    map: map3
  }
]

/** Deep-enough clone so callers don’t mutate shared map refs */
export function cloneSharedOrgLocations() {
  return SHARED_ORG_LOCATIONS.map((loc) => ({ ...loc }))
}

export const SHARED_ORG_LOCATION_IDS = SHARED_ORG_LOCATIONS.map((l) => l.id)
