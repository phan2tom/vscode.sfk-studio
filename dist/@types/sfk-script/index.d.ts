declare class FieldEvents extends ComponentEvents {
  ValueChange?: ScriptModel;
}
declare class CheckboxComponent {
  PublicConfig?: any;
}
declare class CrudComponent {
  Data?: any;
  PublicConfig?: any;
  PublicData?: any;
  PublicTitle?: any;
  isDirty?: boolean;
  createAsync(): Promise<any>;
  deleteAsync(): Promise<void>;
  display(): void;
  getId(): any;
  hide(): void;
  markAsPristine(): void;
  saveAsync(): Promise<void>;
  setIdAsync(newId?: any): any;
  validateAsync(): Promise<void>;
}
declare class GridFlowModel {
  IndexField?: string;
}
declare class GridSortModel {
  Dir?: any;
  Field?: string;
}
declare class DatatargetingfilterpathComponent {
  PublicConfig?: any;
  getValue(significantValue?: boolean): any;
  setData(value?: any, triggerChange?: any): void;
}
declare class RadiobuttongroupComponent {
  PublicConfig?: any;
  getValue(significantValue?: boolean): any;
  setData(value?: any, triggerChange?: any): void;
}
declare class PlanningComponent {
  PublicConfig?: any;
  PublicTitle?: any;
  display(): void;
  hide(): void;
  isPivotActive(): boolean;
}
declare class DataDescriptor {
  Blob?: BlobModel;
  Constraints?: any[];
  Formatter?: any;
}
declare class GPSPosition {
  Key?: string;
  Latitude?: number;
  Longitude?: number;
}
declare class TextboxReadOnlyComponent {
  PublicConfig?: any;
  getValue(significantValue?: boolean): any;
  setData(value?: any, triggerChange?: any): void;
}
declare class RadiobuttongroupReadonlyComponent {
  PublicConfig?: any;
  getItems(): any;
  getValue(significantValue?: boolean): any;
  refreshAsync(filters?: any[]): Promise<void>;
  setItems(itemsData?: any): void;
}
declare class MergeComponent {
  Data?: any;
  PublicConfig?: any;
  PublicData?: any;
  PublicTitle?: any;
  display(): void;
  hide(): void;
  markAsPristine(): void;
  setData(fieldPath?: string, value?: any, createIfNotExist?: any): boolean;
  showPopinAsync(newId?: ForeignDataModel, currentId?: any, allExcept?: string[], only?: string[]): void;
}
declare class Datatargetingv2Component {
  PublicConfig?: any;
  display(): void;
  hide(): void;
  refreshCountAsync(init?: boolean): Promise<void>;
}
declare class ComboboxReadonlyComponent {
  PublicConfig?: any;
  getItems(): any;
  getValue(significantValue?: boolean): any;
  refreshAsync(filters?: any[]): Promise<void>;
  setItems(itemsData?: any): void;
}
declare class ColorpickerComponent {
  PublicConfig?: any;
  getValue(significantValue?: boolean): any;
  setData(value?: any, triggerChange?: any): void;
}
declare class RichTextReadonlyComponent {
  PublicConfig?: any;
  getValue(significantValue?: boolean): any;
  setData(value?: any, triggerChange?: any): void;
}
declare class LineOptions {
  Color?: string;
  Opacity?: number;
  Weight?: number;
}
declare class AvatarComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
  refreshAsync(): Promise<void>;
}
declare class FiltersComponent {
  Data?: any;
  PublicConfig?: any;
  PublicData?: any;
  PublicTitle?: any;
  ClearSearch(dataSourceName?: string): void;
  Search(dataSourceName?: string): void;
  display(): void;
  getCurrentFilters(dataSourceName?: string): {};
  hide(): void;
  markAsPristine(): void;
  setData(fieldPath?: string, value?: any, createIfNotExist?: any): boolean;
}
declare class GaugeComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
}
declare class DatatargetingfilterComponent {
  Data?: any;
  PublicConfig?: any;
  PublicData?: any;
  PublicTitle?: any;
  display(): void;
  hide(): void;
  markAsPristine(): void;
  setData(fieldPath?: string, value?: any, createIfNotExist?: any): boolean;
}
declare class ScalarDataSourceModel extends DataSourceModel {
  Value?: any;
}
declare class MetaDataSourceContext {
  Context?: DataSourceContext;
  Meta?: DataSourceContext;
}
declare class FiltersV2Component {
  Data?: any;
  PublicConfig?: any;
  PublicData?: any;
  PublicTitle?: any;
  Search(parameter?: string | any): any;
  display(): void;
  hide(): void;
  markAsPristine(): void;
  setData(fieldPath?: string, value?: any, createIfNotExist?: any): boolean;
}
declare class EmailingComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
  refreshCountAsync(init?: boolean): Promise<void>;
}
declare class BaseModel {
  ClientType?: string;
  DatasourceNames?: string[];
  Dependencies?: any;
  Events?: ComponentEvents;
  Layout?: LayoutEnum;
  ReadOnly?: boolean;
  ScriptId?: string;
  Tags?: string[];
  Visible?: any;
  Weight?: number;
}
declare class NumberComponent {
  PublicConfig?: any;
  getValue(significantValue?: boolean): any;
  setData(value?: any, triggerChange?: any): void;
}
declare class IconComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
  refreshAsync(): any;
}
declare class ComplexComponentTitleComponent {
  PublicConfig?: any;
  PublicTitle?: any;
  display(): void;
  hide(): void;
}
declare class NotificationService {
  error(error?: any | string): void;
  info(message?: string): void;
  success(message?: string): void;
  warning(message?: string): void;
}
declare class Targeting {
  ActiveField?: string;
  Count?: any;
  DatatargetingId?: number;
  Enabled?: boolean;
  FromCode?: string;
  FromTable?: string;
  FromTableCodeFieldName?: string;
  SegmentGroups?: any[];
  SourceTable?: string;
  TargetColumnCode?: string;
  TargetColumnId?: string;
  TargetTable?: string;
  ValidityEnd?: string;
  ValidityEndField?: string;
  ValidityStart?: string;
  ValidityStartField?: string;
}
declare class ColumnEvents {
  Click?: ScriptModel;
}
declare class ListDataSourceModel extends DataSourceModel {
  IdField?: any;
  LabelField?: any;
}
declare class DataSourceModel {
  Columns?: any;
  ContextName?: string;
  Formatters?: any;
  LazyLoading?: boolean;
  PrimaryKey?: string;
  Result?: any;
  TableName?: string;
  TableWatchers?: string[];
}
declare class TreeviewManagerComponent {
  Autofocus?: boolean;
  ClientType?: string;
  ContextualMenuActions?: any;
  Data?: any;
  DataDescriptor?: DataDescriptor;
  DataSource?: string;
  DatasourceNames?: string[];
  DefaultValue?: ScalarDataSourceModel;
  DefaultValueList?: ListDataSourceModel;
  Dependencies?: any;
  Description?: string;
  Events?: TreeviewEvents;
  Label?: string;
  Layout?: LayoutEnum;
  Mode?: string;
  ReadOnly?: boolean;
  RootName?: any;
  ScriptId?: string;
  StoredValue?: any;
  StoredValueList?: ListDataSourceModel;
  Tags?: string[];
  Visible?: any;
  Weight?: number;
}
declare class DatatargetingComponent {
  Data?: any;
  PublicConfig?: any;
  PublicData?: any;
  PublicTitle?: any;
  display(): void;
  hide(): void;
  markAsPristine(): void;
  setData(fieldPath?: string, value?: any, createIfNotExist?: any): boolean;
}
declare class TabComponent {
  PublicConfig?: any;
  PublicTitle?: any;
  display(): void;
  hide(): void;
}
declare class ForeignReadonlyComponent {
  PublicConfig?: any;
  setData(value?: number | string | any | any[] | any, triggerChange?: any): void;
}
declare class ParamUrl {
  Config?: string;
  Id?: any;
  QueryParams?: any;
}
declare class ExternalAccount {
  DeviceName?: string;
  DeviceType?: string;
  Language?: string;
  Role?: string;
  Status?: any;
}
declare enum JoinType {
  Up = '0',
  Down = '1',
  NoJoin = '2'
}
declare class Segment {
  Description?: string;
  JsonDefinition?: JoinDefinition;
  SegmentAssignations?: any[];
  SegmentId?: number;
  Status?: number;
  Tablename?: string;
}
declare class GridFilterableModel {
  Filters?: any;
  Mode?: string;
}
declare class DatavizselectorComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
}
declare class UploadReadOnlyComponent {
  PublicConfig?: any;
  getValue(significantValue?: boolean): any;
  setData(value?: any, triggerChange?: any): void;
}
declare class TreeviewInputComponent {
  Autofocus?: boolean;
  ClientType?: string;
  ContextualMenuActions?: any;
  Data?: any;
  DataDescriptor?: DataDescriptor;
  DataSource?: string;
  DatasourceNames?: string[];
  DefaultValue?: ScalarDataSourceModel;
  DefaultValueList?: ListDataSourceModel;
  Dependencies?: any;
  Description?: string;
  Events?: TreeviewEvents;
  Label?: string;
  Layout?: LayoutEnum;
  Mode?: string;
  ReadOnly?: boolean;
  RootName?: any;
  ScriptId?: string;
  StoredValue?: any;
  StoredValueList?: ListDataSourceModel;
  Tags?: string[];
  Visible?: any;
  Weight?: number;
}
declare class Aggregate {
  Catalog?: string;
  Count?: number;
  Fieldname?: string;
  Icon?: string;
}
declare enum ContainerAlign {
  Left = 'Left',
  Right = 'Right',
  Center = 'Center'
}
declare enum ServerScriptType {
  Swing = 'Swing'
}
declare class PopinComponent {
  PublicConfig?: any;
  PublicTitle?: any;
  display(): void;
  hide(): void;
}
declare class GridEvents extends ComponentEvents {
  AfterUpdate?: ScriptModel;
  BeforeUpdate?: ScriptModel;
  SelectionChange?: ScriptModel;
}
declare class MainService {
  hideLoader(): void;
  showLoader(): void;
}
declare class PictureComponent {
  PublicConfig?: any;
  getValue(significantValue?: boolean): any;
  setData(value?: any, triggerChange?: any): void;
}
declare class RichTextComponent {
  PublicConfig?: any;
  getValue(significantValue?: boolean): any;
  setData(value?: any, triggerChange?: any): void;
}
declare class ForeignDataModel {
  id?: number|string;
  label?: string;
}
declare class ForeignComponent {
  PublicConfig?: any;
  setData(value?: number | string | any | any[] | any, triggerChange?: any): void;
}
declare class DatepickerV2Component {
  PublicConfig?: any;
}
declare class ListReadonlyComponent {
  PublicConfig?: any;
  getSelectedNodes(): |[];
}
declare class ColumnModel {
  Average?: boolean;
  ColumnTemplate?: string;
  Count?: boolean;
  Description?: string;
  Editable?: ColumnEditableModel;
  EditorType?: string;
  Events?: ColumnEvents;
  Exportable?: boolean;
  Field?: string;
  Filterable?: boolean;
  FooterTemplate?: string;
  Format?: string;
  GroupFooterTemplate?: string;
  Hidden?: boolean;
  Index?: number;
  Link?: LinkDataModel;
  Locked?: boolean;
  Max?: boolean;
  Min?: boolean;
  Picture?: PictureModel;
  Primary?: boolean;
  Sortable?: boolean;
  Source?: string;
  Style?: string;
  Sum?: boolean;
  TextAlign?: string;
  Title?: string;
  Type?: string;
  Width?: number;
}
declare class RouteInformation {
  arrivalPoint?: GPSPosition;
  initialGPSList?: any[];
  startingPoint?: GPSPosition;
  transportMode?: number;
}
declare class LinkComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
}
declare class LegacyService {
  addEventAsync(actionCode?: string): Promise<any>;
}
declare class HubComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
}
declare class BadgeComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
}
declare class PageTitleComponent {
  Align?: ContainerAlign;
  Children?: any;
  ClientType?: string;
  DatasourceNames?: string[];
  Dependencies?: any;
  Events?: ContainerEvents;
  Label?: string;
  Layout?: LayoutEnum;
  LayoutTemplate?: LayoutTemplate;
  PublicConfig?: any;
  PublicTitle?: any;
  ReadOnly?: boolean;
  ScriptId?: string;
  StaticChildren?: any;
  SubTitleLinks?: Array<LinkDataModel>;
  Tags?: string[];
  Title?: TitleGroupModel;
  Visible?: any;
  Weight?: number;
  display(): void;
  hide(): void;
}
declare class DynamicFieldsComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
}
declare class ScriptModel {
  Parameters?: ScriptParametersModel;
  Script?: string | any;
  ScriptName?: string;
  ServerScript?: string;
  Shared?: ScriptParametersModel;
  Translations?: any;
}
declare class JoinDefinition {
  Filters?: any[];
  Joins?: any[];
  TableJoin?: TableJoin;
  TargetingReference?: number;
  TargetingReferenceFieldName?: string;
}
declare class BlobModel {
  BlobLengthFieldname?: string;
  FilenameFieldname?: string;
  Mimetype?: string;
}
declare class TableJoinValue {
  FieldName?: string;
  ForeignTableId?: string;
  Id?: string;
  JoinType?: JoinType;
}
declare class ColumnEditableModel {
  Column?: string;
  Mapping?: ColumnEditableMappingModel;
}
declare class SegmentComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
}
declare class TitleGroupModel extends ContainerModel {
  Align?: ContainerAlign;
  Label?: string;
  SubTitleLinks?: Array<LinkDataModel>;
  Children?: any;
  Events?: ContainerEvents;
  LayoutTemplate?: LayoutTemplate;
  StaticChildren?: any;
  Title?: TitleGroupModel;
  ClientType?: string;
  DatasourceNames?: string[];
  Dependencies?: any;
  Layout?: LayoutEnum;
  ReadOnly?: boolean;
  ScriptId?: string;
  Tags?: string[];
  Visible?: any;
  Weight?: number;
}
declare class MapAddress {
  City?: string;
  Country?: string;
  PostCode?: string;
  Street?: string;
}
declare class PictureModel {
  ApiUrl?: string;
  BlobFieldname?: string;
  Datasource?: string;
  Height?: number;
  PictureIdFieldname?: string;
  Width?: number;
}
declare class ProfileComponent {
  refreshAsync(): Promise<void>;
}
declare class ListComponent {
  PublicConfig?: any;
  getSelectedNodes(): |[];
}
declare class BackcrudeventComponent {
  Data?: any;
  PublicConfig?: any;
  PublicData?: any;
  PublicTitle?: any;
  isDirty?: boolean;
  deleteAsync(): Promise<void>;
  display(): void;
  getId(): any;
  hide(): void;
  markAsPristine(): void;
  setIdAsync(newId?: any): any;
  validateAsync(): Promise<void>;
}
declare class ComponentEvents {
  AfterLoad?: ScriptModel;
  AfterRender?: ScriptModel;
  BeforeUnload?: ScriptModel;
}
declare class EmailingImportStatsActionComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
}
declare class ColumnEditableMappingModel {
  Off?: ScalarDataSourceModel;
  On?: ScalarDataSourceModel;
}
declare class DistanceInformation {
  arrivalPoint?: GPSPosition;
  startingPoint?: GPSPosition;
  transportMode?: number;
}
declare class MapService {
  getGeolocalisationFromAddressAsync(address?: MapAddress): Promise<any>;
  getRoadAsync(distanceInformation?: DistanceInformation): Promise<any>;
  optimizeRoadAsync(routeInformation?: RouteInformation): Promise<any[]>;
}
declare class DynamicComponent {
  Data?: any;
  PublicConfig?: any;
  PublicData?: any;
  PublicTitle?: any;
  display(): void;
  hide(): void;
  markAsPristine(): void;
  refreshAsync(): Promise<void>;
  setData(fieldPath?: string, value?: any, createIfNotExist?: any): boolean;
}
declare class MapItem {
  LabelField?: string;
  LatitudeField?: number;
  LinkField?: string;
  LongitudeField?: number;
  PinColorField?: string;
  PinStyleField?: string;
  PinTextField?: string;
  SerieField?: string;
}
declare class PopinSettings {
  BeforeNavigate?: ScriptModel;
  CallerId?: string;
  CleanUrlObject?: any;
  Height?: number|string;
  Left?: number|string;
  Parent?: string;
  PopinType?: string;
  Shared?: any;
  Top?: number|string;
  ValidationScript?: ScriptModel;
  Width?: number|string;
}
declare class TreeviewCdkComponent {
  PublicConfig?: any;
  getSelectedNodes(): |[];
}
declare class ContainerModel extends BaseModel {
  Children?: any;
  Events?: ContainerEvents;
  LayoutTemplate?: LayoutTemplate;
  StaticChildren?: any;
  Title?: TitleGroupModel;
  ClientType?: string;
  DatasourceNames?: string[];
  Dependencies?: any;
  Layout?: LayoutEnum;
  ReadOnly?: boolean;
  ScriptId?: string;
  Tags?: string[];
  Visible?: any;
  Weight?: number;
}
declare class ExternalAccountService {
  addAssociationAsync(account?: ExternalAccount, tablename?: string, id?: any): Promise<any>;
  changeAccountRoleAsync(account?: ExternalAccount, tablename?: string): Promise<void>;
  deleteAccountAsync(account?: ExternalAccount, tablename?: string): any;
  getExternalAccountsAsync(tablename?: string): Promise<void>;
}
declare class SchedulerKendoComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
  refreshAsync(): any;
}
declare class ComboboxV2Component {
  PublicConfig?: any;
  getItems(): {};
  getValue(significantValue?: boolean): any;
  refreshAsync(filters?: any[]): any;
  setData(value?: any, triggerChange?: any): void;
  setItems(itemsData?: any): void;
}
declare class FilterItem {
  DataSourceName?: string;
  DefaultFilter?: boolean;
  DefaultOperator?: string | any;
  FieldName?: string;
  FilterKey?: string;
  Group?: string;
  Operator?: string | any;
  SignificantValue?: boolean;
  Value?: any;
}
declare class PasswordComponent {
  PublicConfig?: any;
  getValue(significantValue?: boolean): any;
  setData(value?: any, triggerChange?: any): void;
}
declare class ContextualNavigationService {
  getParams(): ParamUrl;
  navigate(link?: LinkDataModel, routeData?: any): Promise<boolean>;
  refresh(): void;
}
declare class ColorPickerReadonlyComponent {
  PublicConfig?: any;
  getValue(significantValue?: boolean): any;
  setData(value?: any, triggerChange?: any): void;
}
declare class EmailReadonlyComponent {
  PublicConfig?: any;
  getValue(significantValue?: boolean): any;
  setData(value?: any, triggerChange?: any): void;
}
declare class GraphComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
  refresh(): void;
  refreshAsync(): any;
}
declare class CrudReadonlyComponent {
  Data?: any;
  PublicConfig?: any;
  PublicData?: any;
  PublicTitle?: any;
  isDirty?: boolean;
  createAsync(): Promise<any>;
  deleteAsync(): Promise<void>;
  display(): void;
  getId(): any;
  hide(): void;
  markAsPristine(): void;
  saveAsync(): Promise<void>;
  setIdAsync(newId?: any): any;
  validateAsync(): Promise<void>;
}
declare class TreeviewStandaloneComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
}
declare class TreeviewReadonlyComponent {
  PublicConfig?: any;
  getSelectedNodes(): |[];
}
declare class SchedulerComponent {
  PublicConfig?: any;
  display(): void;
  filterAndSortResources(filters?: any[], fieldName?: string, direction?: any | any): void;
  filterResources(filters?: any[], fieldName?: string, direction?: any | any): void;
  filterResourcesWithBadges(badgeFilters?: any[]): void;
  getCurrentView(): any;
  getDateRange(): { start: any; end: any; };
  getEvents(): {};
  getWorkingDayRange(): { start: any; end: any; };
  hide(): void;
}
declare class DataValue {
  FieldName?: string;
  FieldType?: string;
  Value?: any;
}
declare class TreeviewToolbarComponent {
  Autofocus?: boolean;
  ClientType?: string;
  ContextualMenuActions?: any;
  Data?: any;
  DataDescriptor?: DataDescriptor;
  DataSource?: string;
  DatasourceNames?: string[];
  DefaultValue?: ScalarDataSourceModel;
  DefaultValueList?: ListDataSourceModel;
  Dependencies?: any;
  Description?: string;
  Events?: TreeviewEvents;
  Label?: string;
  Layout?: LayoutEnum;
  Mode?: string;
  ReadOnly?: boolean;
  RootName?: any;
  ScriptId?: string;
  StoredValue?: any;
  StoredValueList?: ListDataSourceModel;
  Tags?: string[];
  Visible?: any;
  Weight?: number;
}
declare class TabsComponent {
  PublicConfig?: any;
  PublicTitle?: any;
  display(): void;
  getActiveTab(tabConfigId?: string): any;
  hide(): void;
  setActiveTab(tabConfigId?: string): void;
}
declare class LinkListComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
}
declare class ServerScriptService {
  executeAsync(scriptName?: string, parameters?: any[], scriptType?: ServerScriptType): Promise<any>;
}
declare class PictureReadOnlyComponent {
  PublicConfig?: any;
  getValue(significantValue?: boolean): any;
  setData(value?: any, triggerChange?: any): void;
}
declare class PageComponent {
  PublicConfig?: any;
  PublicTitle?: any;
  display(): void;
  hide(): void;
}
declare class MapLeafletComponent {
  PublicConfig?: any;
  addMarker(item?: MapItem): void;
  autoCenter(): void;
  clearLines(): void;
  clearMarkers(): void;
  display(): void;
  drawMultipleLine(key?: string, Items?: any[], option?: LineOptions): void;
  editMarker(item?: MapItem): void;
  getMarkers(): any[];
  hide(): void;
  refreshAsync(): any;
  removeLine(key?: string): void;
  removeMarker(item?: MapItem): void;
  setView(latitude?: number, longitude?: number, zoom?: number): void;
}
declare class DatatargetingpreviewgridComponent {
  PublicConfig?: any;
  cancelEdititon(): void;
  display(): void;
  editCell(rowIndex?: any, columnIndex?: any): void;
  exportExcel(): void;
  getCheckedItems(): Array<any>;
  hide(): void;
  refresh(): void;
  refreshAsync(): any;
  resetCheckedItems(): void;
  setData(data?: any[]): void;
  setFilter(columnKey?: string, filterValue?: any): void;
}
declare class GlobalDialogService {
  confirm(title?: string, content?: string, actions?: any[] | any[]): Promise<any>;
  confirmYesNo(title?: string, content?: string): Promise<boolean>;
}
declare class GridKendoComponent {
  PublicConfig?: any;
  cancelEdititon(): void;
  display(): void;
  editCell(rowIndex?: any, columnIndex?: any): void;
  exportExcel(): void;
  getCheckedItems(): Array<any>;
  hide(): void;
  refresh(): void;
  refreshAsync(): any;
  resetCheckedItems(): void;
  setData(data?: any[]): void;
  setFilter(columnKey?: string, filterValue?: any): void;
}
declare interface ScriptParametersModel {
  defaultBehavior?: any;
}
declare class DropdownbuttonComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
}
declare class EmailingExportContactsActionComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
}
declare enum MultiSelectionEnum {
  Single = 'Single',
  Multiple = 'Multiple'
}
declare enum GridEditableEnum {
  Inline = 'Inline',
  Direct = 'Direct',
  None = 'None'
}
declare class TextboxComponent {
  PublicConfig?: any;
  getValue(significantValue?: boolean): any;
  setData(value?: any, triggerChange?: any): void;
}
declare class DataexportComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
}
declare class EmailComponent {
  PublicConfig?: any;
  getValue(significantValue?: boolean): any;
  setData(value?: any, triggerChange?: any): void;
}
declare class DataImportExportComponent {
  PublicConfig?: any;
  continueError?: any;
  selectedActionChoice?: number;
  selectedImportChoice?: number;
  selectedTableChoice?: string;
  display(): void;
  hide(): void;
}
declare class WidgetComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
  refreshAsync(): any;
}
declare class MetricComponent {
  PublicConfig?: any;
  RefreshParameters(config?: any, dataResult?: any | any): void;
  display(): void;
  hide(): void;
  refreshAsync(): any;
}
declare class LayoutTemplate extends BaseModel {
}
declare class LinkDataModel {
  FileTarget?: FileTargetModel;
  Icon?: string;
  Label?: string;
  Mode?: string;
  Output?: string;
  Params?: any;
  Popin?: PopinSettings;
  Target?: string;
}
declare class LabelComponent {
  PublicConfig?: any;
  getValue(significantValue?: boolean): any;
  setData(value?: any, triggerChange?: any): void;
}
declare class ApiDataService {
  removeFilter(datasourceName?: string, FilterKeys?: string | any[]): void;
  setFilter(datasourceName?: string, filters?: any[]): void;
}
declare class DatatargetingService {
  DeleteSegment(segmentId?: number): any;
  SaveSegmentAsync(segment?: Segment, ignoreNotif?: any): Promise<any>;
  SaveTargetingAsync(targeting?: Targeting): Promise<any>;
  cloneSegmentAsync(segmentId?: number): Promise<number>;
  deleteTargetingAsync(targertingId?: number): Promise<any>;
  duplicateAsync(targetingId?: number, newCode?: string): Promise<number>;
  duplicateEmailingAsync(targetingId?: number, newCode?: string): Promise<number>;
}
declare class FileTargetModel {
  BlobFieldname?: string;
  Datasource?: string;
  FileId?: string;
  ZoomImage?: boolean;
}
declare class ComboboxComponent {
  PublicConfig?: any;
  getItems(): any;
  getValue(significantValue?: boolean): any;
  refreshAsync(filters?: any[]): Promise<void>;
  setData(value?: any, triggerChange?: any): void;
  setItems(itemsData?: any): void;
}
declare class TreeviewEvents extends FieldEvents {
  AfterDrop?: ScriptModel;
  AfterUnlink?: ScriptModel;
  BeforeDelete?: ScriptModel;
  BeforeDrop?: ScriptModel;
  BeforeInsert?: ScriptModel;
  BeforeUnlink?: ScriptModel;
  BeforeUpdate?: ScriptModel;
}
declare class VariableService {
  get(name?: string): any;
  set(name?: string, value?: any, asQueryParam?: boolean): void;
}
declare class TableJoin {
  text?: string;
  value?: TableJoinValue;
}
declare interface GridCellRules {
  ColumnStylesRules?: any[];
  RowStyleRules?: any[];
}
declare class TabTitleComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
}
declare class ContainerEvents extends ComponentEvents {
  AfterChildrenLoad?: ScriptModel;
  BeforeChildrenLoad?: ScriptModel;
  Cancel?: ScriptModel;
}
declare class GridSettingsComponent {
  ActionLinks?: any[];
  Aggregates?: Array<Aggregate>;
  ClientSideOperations?: boolean;
  ClientType?: any;
  CollapseGroups?: boolean;
  ColumnWidth?: number;
  Columns?: any;
  CurrentPage?: number;
  CurrentSort?: GridSortModel;
  Data?: DataSourceModel;
  DataDescription?: DataSourceModel;
  DataSource?: string;
  DataSourceApiUri?: string;
  DataSourceDescription?: string;
  DatasourceNames?: string[];
  Dependencies?: any;
  Editable?: GridEditableEnum;
  Events?: GridEvents;
  ExportExcel?: boolean;
  ExportExcelFileName?: string;
  ExportPdf?: boolean;
  ExportPdfFileName?: string;
  Filterable?: GridFilterableModel;
  Flow?: GridFlowModel;
  GroupBy?: string;
  GroupByColumn?: ColumnModel;
  Height?: number;
  HideColumnHeaders?: boolean;
  Layout?: LayoutEnum;
  LoadDataOnInit?: boolean;
  PageSize?: number;
  Pageable?: boolean;
  ReadOnly?: boolean;
  ScriptId?: string;
  SelectionMode?: GridMultiSelectionModel;
  Sortable?: boolean;
  StyleRules?: GridCellRules;
  Tags?: string[];
  TextWrap?: boolean;
  Title?: TitleGroupModel;
  Visible?: any;
  Weight?: number;
}
declare class GroupComponent {
  PublicConfig?: any;
  PublicTitle?: any;
  display(): void;
  hide(): void;
}
declare class GlobalApiDataService {
  cloneAsync(dataSource?: string, id?: string, values?: any[]): Promise<number>;
  deleteAsync(dataSource?: string, ids?: number | any[]): Promise<boolean>;
  insertAsync(dataSource?: string, values?: any[]): Promise<number>;
  selectAsync(dataSource?: string, context?: DataSourceContext, params?: any): Promise<any>;
  selectByIdAsync(dataSource?: string, id?: any): Promise<any>;
  selectWithMetaAsync(dataSource?: string, metaContext?: MetaDataSourceContext): Promise<any>;
  updateAsync(dataSource?: string, ids?: number | any, values?: any[], params?: { [name: string]: any }): Promise<number>;
}
declare class DatepickerComponent {
  PublicConfig?: any;
}
declare class FiltersCompactComponent {
  Data?: any;
  PublicConfig?: any;
  PublicData?: any;
  PublicTitle?: any;
  display(): void;
  hide(): void;
  markAsPristine(): void;
  setData(fieldPath?: string, value?: any, createIfNotExist?: any): boolean;
}
declare class SessionService {
  getAsync(key?: string): Promise<any>;
  removeAsync(key?: string | any[]): Promise<void>;
  setAsync(key?: string | any, value?: any): Promise<void>;
  setFromDataSourceAsync(datasourceName?: string): Promise<void>;
}
declare class ConditionService {
  evaluateCondition(condition?: any[]): Promise<boolean>;
  evaluateTargetsAsync(targets?: string[]): Promise<any[]>;
}
declare class GroupsComponent {
  PublicConfig?: any;
  PublicTitle?: any;
  display(): void;
  hide(): void;
}
declare class CheckboxReadonlyComponent {
  PublicConfig?: any;
}
declare class UploadComponent {
  PublicConfig?: any;
  getValue(significantValue?: boolean): any;
  setData(value?: any, triggerChange?: any): void;
}
declare class KanbanComponent {
  PublicConfig?: any;
  display(): void;
  hide(): void;
}
declare class Source {
  content?: any;
  entity?: any;
  id?: string;
  subtitle?: string;
  title?: string;
}
declare class DataSourceContext {
  ContextParameters?: any;
  Filters?: Array<FilterItem>;
  Page?: number;
  PageSize?: number;
  RequestType?: any;
  Values?: any[];
}
declare enum LayoutEnum {
  Inline = 'Inline',
  Rows = 'Rows'
}
declare class DatepickerReadOnlyComponent {
  PublicConfig?: any;
}
declare class GridMultiSelectionModel {
  Mode?: MultiSelectionEnum;
  Order?: boolean;
}
declare const $condition: ConditionService;
declare const $navigation: ContextualNavigationService;
declare const $externalAccount: ExternalAccountService;
declare const $database: GlobalApiDataService;
declare const $dialog: GlobalDialogService;
declare const $legacy: LegacyService;
declare const $page: MainService;
declare const $map: MapService;
declare const $notify: NotificationService;
declare const $serverScript: ServerScriptService;
declare const $session: SessionService;
declare const $variable: VariableService;
declare const $sender: any;

declare class ComponentService {
  getById<T extends any>(componentId: string): T;
}
declare const $component: ComponentService;

declare class LibraryService {
  getLibraryAsync<T extends any>(libraryName: string): T;
}
declare const $library: LibraryService;

declare class CancellationToken {
  cancel(): void;
}
declare const $token: CancellationToken;

declare class ParametersDef {
  value: any;
  newId: number;
  currentId: number;
  data: { [key: string]: any };
}
declare const $parameters: ParametersDef;
                
