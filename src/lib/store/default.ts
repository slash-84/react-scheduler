import enUS from "date-fns/locale/en-US";
import { SchedulerProps } from "../types";
import { getOneView } from "../helpers/generals";

const defaultMonth = {
  weekDays: [0, 1, 2, 3, 4, 5, 6],
  weekStartOn: 6,
  startHour: 9,
  endHour: 17,
  navigation: true,
};

const defaultWeek = {
  weekDays: [0, 1, 2, 3, 4, 5, 6],
  weekStartOn: 6,
  startHour: 9,
  endHour: 17,
  step: 60,
  navigation: true,
};

const defaultDay = {
  startHour: 9,
  endHour: 17,
  step: 60,
  navigation: true,
};

const defaultResourceFields = {
  idField: "assignee",
  textField: "text",
  subTextField: "subtext",
  avatarField: "avatar",
  colorField: "color",
};

const defaultTranslations = (trans: Partial<SchedulerProps["translations"]> = {}) => {
  const { navigation, form, event, ...other } = trans;

  return {
    navigation: Object.assign(
      {
        month: "Month",
        week: "Week",
        day: "Day",
        today: "Today",
      },
      navigation
    ),
    form: Object.assign(
      {
        addTitle: "Add Event",
        editTitle: "Edit Event",
        confirm: "Confirm",
        delete: "Delete",
        cancel: "Cancel",
      },
      form
    ),
    event: Object.assign(
      {
        title: "Title",
        start: "Start",
        end: "End",
        allDay: "All Day",
      },
      event
    ),
    ...Object.assign({ moreEvents: "More..." }, other),
  };
};

export const defaultProps = (props: Partial<SchedulerProps>) => {
  const { month, week, day, translations, resourceFields, view, ...otherProps } = props;
  const _month = month !== null ? Object.assign(defaultMonth, month) : null;
  const _week = week !== null ? Object.assign(defaultWeek, week) : null;
  const _day = day !== null ? Object.assign(defaultDay, day) : null;
  const initialView = getOneView({ month: _month, week: _week, day: _day });
  return {
    month: _month,
    week: _week,
    day: _day,
    translations: defaultTranslations(translations),
    resourceFields: Object.assign(defaultResourceFields, resourceFields),
    view: initialView,
    ...Object.assign(
      {
        height: 600,
        navigation: true,
        selectedDate: new Date(),
        events: [],
        fields: [],
        loading: undefined,
        customEditor: undefined,
        onConfirm: undefined,
        onDelete: undefined,
        viewerExtraComponent: undefined,
        resources: [],
        recourseHeaderComponent: undefined,
        resourceViewMode: "default",
        direction: "ltr",
        dialogMaxWidth: "md",
        locale: enUS,
        deletable: true,
        editable: true,
        hourFormat: "12",
        draggable: true,
      },
      otherProps
    ),
  };
};

export const initialStore = {
  ...defaultProps({}),
  initiateProps: () => {},
  dialog: false,
  selectedRange: undefined,
  selectedEvent: undefined,
  selectedResource: undefined,
  handleState: () => {},
  getViews: () => [],
  triggerDialog: () => {},
  triggerLoading: () => {},
  handleGotoDay: () => {},
  confirmEvent: () => {},
  onDrop: () => {},
};