export interface SitePropsInterface {
  blind: boolean
  dark: boolean
  language: "PL" | "EN"
}

export interface CompanyAlert {
  _id: string
  linkPath: string
  name: string
}

export interface UserIdNameSurname {
  _id: string
  name: string
  surname: string
}

export interface ReserwationAlert {
  company: CompanyAlert
  dateDay: number
  dateEnd: string
  dateMonth: number
  dateStart: string
  dateYear: number
  fromUser: UserIdNameSurname
  serviceName: string
  _id: string
}

export interface CommunitingAlert {
  city: string
  companyId: CompanyAlert
  day: number
  description: string
  month: number
  timeEnd: string
  timeStart: string
  userId: UserIdNameSurname
  year: number
  _id: string
}

export interface ServiceAlert {
  companyId: CompanyAlert
  cost: number
  createdAt: Date
  // dateEnd: null
  // dateService: null
  dateStart: Date
  day: number
  description: string
  month: number
  objectName: string
  statusValue: number
  userId: UserIdNameSurname
  workerUserId: string
  year: number
  _id: string
}

export interface BellAlert {
  active: boolean
  companyChanged: boolean
  createdAt?: string
  creationTime: string
  reserwationId?: ReserwationAlert
  communitingId?: CommunitingAlert
  serviceId?: ServiceAlert
  toUserId: string
  type: number
  updatedAt?: string
}

export interface LoginUserInterface {
  accountVerified: Date
  alertActiveCount: number
  alerts: BellAlert[]
  allCompanys: any
  blindMode: boolean
  blockUserChangeEmail: Date
  blockUserChangePhoneNumber: Date
  blockUserSendVerifiedPhoneSms: Date
  company: any | null
  darkMode: boolean
  defaultCompany: string | null
  email: string
  emailToVerified: boolean | null
  emailVerified: boolean
  favouritesCompanys: any
  hasPhone: boolean
  imageUrl: string | null
  language: "PL" | "EN"
  phoneVerified: boolean
  stamps: any
  token: string
  userId: string
  userName: string
  userSurname: string
  vapidPublic: number
}
