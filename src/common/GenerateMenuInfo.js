const generateMenuInfo = ({
  handleClickLogin,
  loginVisible,
  userServicesVisible,
  user,
  handleClickUserServicesVisible,
  location,
  isMobileSize,
  handleMenuOpen,
  isBarSize,
}) => {
  const pathname = location.pathname
  console.log(isMobileSize)
  return [
    {
      title: "Gdzie znajdują się usługi firmy?",
      steps: [
        {
          title:
            "Znajdz odpowiadającą Tobie firmę, a następnie kliknij przycisk Rezerwuj",
          path: "/",
          pathValid: pathname === "/",
          pathRouteEnable: true,
          pathRouteName: "Przejdz do strony wyboru firm",
          elementId: "PlaceItem",
          elementName: "Pokaż firmy",
          elementValid: true,
          elementHandler: null,
          lightFromEffect: false,
        },
        {
          title: "Gdy wybierzesz już firmę to przejdz do usług",
          path: "/company",
          pathValid: pathname === "/company",
          pathRouteEnable: false,
          pathRouteName: null,
          elementId: "AllCategoryOfServices",
          elementName: "Pokaż usługi",
          elementValid: true,
          elementHandler: null,
          lightFromEffect: false,
        },
      ],
    },
    {
      title: "Gdzie znajdują się wszystkie rezerwację użytkownika?",
      steps: [
        {
          title: "Zaloguj się aby móc mieć dostęp do Twoich rezerwacji",
          path: null,
          pathValid: true,
          pathRouteEnable: false,
          pathRouteName: null,
          elementId: "LoginContent",
          elementName: "Przejdz do logowania",
          elementValid: !loginVisible && !!!user,
          elementHandler: handleClickLogin,
          lightFromEffect: false,
        },
        {
          title:
            "Przejdz do Twoich usług, które znajdują się w górnym menu (nawigacja) lub w rozwijanym menu bocznym",
          path: null,
          pathValid: true,
          pathRouteEnable: false,
          pathRouteName: null,
          elementId: "YourServicesButton",
          elementName: "Pokaż przycisk Twoje usługi",
          elementValid: true,
          elementHandler: isBarSize ? handleMenuOpen : null,
          lightFromEffect: true,
        },
        {
          title: "Naciśnij przycisk Twoje usługi",
          path: null,
          pathValid: true,
          pathRouteEnable: false,
          pathRouteName: null,
          elementId: "YourServicesAllButtons",
          elementName: "Przejdz do Twoich usług",
          elementValid: !userServicesVisible && !!user,
          elementHandler: handleClickUserServicesVisible,
          lightFromEffect: false,
        },
        {
          title:
            "Wszystkie Twoje rezerwacje dostępne są pod przyciskiem Rezerwacje",
          path: null,
          pathValid: true,
          pathRouteEnable: false,
          pathRouteName: null,
          elementId: "BookingHistoryButton",
          elementName: "Pokaż przycisk Rezerwacje",
          elementValid: !!user,
          elementHandler: handleClickUserServicesVisible,
          lightFromEffect: true,
        },
      ],
    },
    {
      title: "Gdzie znajdują się wszystkie serwisy użytkownika?",
      steps: [
        {
          title: "Zaloguj się aby móc mieć dostęp do Twoich rezerwacji",
          path: null,
          pathValid: true,
          pathRouteEnable: false,
          pathRouteName: null,
          elementId: "LoginContent",
          elementName: "Przejdz do logowania",
          elementValid: !loginVisible && !!!user,
          elementHandler: handleClickLogin,
          lightFromEffect: false,
        },
        {
          title:
            "Przejdz do Twoich usług, które znajdują się w górnym menu (nawigacja) lub w rozwijanym menu bocznym",
          path: null,
          pathValid: true,
          pathRouteEnable: false,
          pathRouteName: null,
          elementId: "YourServicesButton",
          elementName: "Pokaż przycisk Twoje usługi",
          elementValid: true,
          elementHandler: isBarSize ? handleMenuOpen : null,
          lightFromEffect: true,
        },
        {
          title: "Naciśnij przycisk Twoje usługi",
          path: null,
          pathValid: true,
          pathRouteEnable: false,
          pathRouteName: null,
          elementId: "YourServicesAllButtons",
          elementName: "Przejdz do Twoich usług",
          elementValid: !userServicesVisible && !!user,
          elementHandler: handleClickUserServicesVisible,
          lightFromEffect: false,
        },
        {
          title: "Wszystkie Twoje serwisy dostępne są pod przyciskiem Serwisy",
          path: null,
          pathValid: true,
          pathRouteEnable: false,
          pathRouteName: null,
          elementId: "ServicesHistoryButton",
          elementName: "Pokaż przycisk Serwisy",
          elementValid: !!user,
          elementHandler: handleClickUserServicesVisible,
          lightFromEffect: true,
        },
      ],
    },
    {
      title: "Gdzie znajdują się wszystkie dojazdy użytkownika?",
      steps: [
        {
          title: "Zaloguj się aby móc mieć dostęp do Twoich rezerwacji",
          path: null,
          pathValid: true,
          pathRouteEnable: false,
          pathRouteName: null,
          elementId: "LoginContent",
          elementName: "Przejdz do logowania",
          elementValid: !loginVisible && !!!user,
          elementHandler: handleClickLogin,
          lightFromEffect: false,
        },
        {
          title:
            "Przejdz do Twoich usług, które znajdują się w górnym menu (nawigacja) lub w rozwijanym menu bocznym",
          path: null,
          pathValid: true,
          pathRouteEnable: false,
          pathRouteName: null,
          elementId: "YourServicesButton",
          elementName: "Pokaż przycisk Twoje usługi",
          elementValid: true,
          elementHandler: isBarSize ? handleMenuOpen : null,
          lightFromEffect: true,
        },
        {
          title: "Naciśnij przycisk Twoje usługi",
          path: null,
          pathValid: true,
          pathRouteEnable: false,
          pathRouteName: null,
          elementId: "YourServicesAllButtons",
          elementName: "Przejdz do Twoich usług",
          elementValid: !userServicesVisible && !!user,
          elementHandler: handleClickUserServicesVisible,
          lightFromEffect: false,
        },
        {
          title: "Wszystkie Twoje dojazdy dostępne są pod przyciskiem Dojazdy",
          path: null,
          pathValid: true,
          pathRouteEnable: false,
          pathRouteName: null,
          elementId: "CommunitingsHistoryButton",
          elementName: "Pokaż przycisk Dojazdy",
          elementValid: !!user,
          elementHandler: handleClickUserServicesVisible,
          lightFromEffect: true,
        },
      ],
    },
  ]
}

export default generateMenuInfo