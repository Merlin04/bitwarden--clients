import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "jslib-angular/guards/auth.guard";
import { Permissions } from "jslib-common/enums/permissions";

import { PermissionsGuard } from "./guards/permissions.guard";
import { OrganizationLayoutComponent } from "./layouts/organization-layout.component";
import { CollectionsComponent } from "../modules/organizations/manage/collections.component";
import { EventsComponent } from "../modules/organizations/manage/events.component";
import { GroupsComponent } from "../modules/organizations/manage/groups.component";
import { ManageComponent } from "../modules/organizations/manage/manage.component";
import { PeopleComponent } from "../modules/organizations/manage/people.component";
import { PoliciesComponent } from "../modules/organizations/manage/policies.component";
import { NavigationPermissionsService } from "./services/navigation-permissions.service";
import { AccountComponent } from "../modules/organizations/settings/account.component";
import { BillingComponent } from "../modules/organizations/settings/billing.component";
import { SubscriptionComponent } from "../modules/organizations/settings/subscription.component";
import { SettingsComponent } from "../modules/organizations/settings/settings.component";
import { TwoFactorSetupComponent } from "../modules/organizations/settings/two-factor-setup.component";
import { ExportComponent } from "../modules/organizations/tools/export.component";
import { ExposedPasswordsReportComponent } from "../modules/organizations/tools/exposed-passwords-report.component";
import { ImportComponent } from "../modules/organizations/tools/import.component";
import { InactiveTwoFactorReportComponent } from "../modules/organizations/tools/inactive-two-factor-report.component";
import { ReusedPasswordsReportComponent } from "../modules/organizations/tools/reused-passwords-report.component";
import { ToolsComponent } from "../modules/organizations/tools/tools.component";
import { UnsecuredWebsitesReportComponent } from "../modules/organizations/tools/unsecured-websites-report.component";
import { WeakPasswordsReportComponent } from "../modules/organizations/tools/weak-passwords-report.component";

const routes: Routes = [
  {
    path: ":organizationId",
    component: OrganizationLayoutComponent,
    canActivate: [AuthGuard, PermissionsGuard],
    data: {
      permissions: NavigationPermissionsService.getPermissions("admin"),
    },
    children: [
      { path: "", pathMatch: "full", redirectTo: "vault" },
      {
        path: "vault",
        loadChildren: async () =>
          (await import("../modules/vault/modules/organization-vault/organization-vault.module"))
            .OrganizationVaultModule,
      },
      {
        path: "tools",
        component: ToolsComponent,
        canActivate: [PermissionsGuard],
        data: { permissions: NavigationPermissionsService.getPermissions("tools") },
        children: [
          {
            path: "",
            pathMatch: "full",
            redirectTo: "import",
          },
          {
            path: "import",
            component: ImportComponent,
            canActivate: [PermissionsGuard],
            data: {
              titleId: "importData",
              permissions: [Permissions.AccessImportExport],
            },
          },
          {
            path: "export",
            component: ExportComponent,
            canActivate: [PermissionsGuard],
            data: {
              titleId: "exportVault",
              permissions: [Permissions.AccessImportExport],
            },
          },
          {
            path: "exposed-passwords-report",
            component: ExposedPasswordsReportComponent,
            canActivate: [PermissionsGuard],
            data: {
              titleId: "exposedPasswordsReport",
              permissions: [Permissions.AccessReports],
            },
          },
          {
            path: "inactive-two-factor-report",
            component: InactiveTwoFactorReportComponent,
            canActivate: [PermissionsGuard],
            data: {
              titleId: "inactive2faReport",
              permissions: [Permissions.AccessReports],
            },
          },
          {
            path: "reused-passwords-report",
            component: ReusedPasswordsReportComponent,
            canActivate: [PermissionsGuard],
            data: {
              titleId: "reusedPasswordsReport",
              permissions: [Permissions.AccessReports],
            },
          },
          {
            path: "unsecured-websites-report",
            component: UnsecuredWebsitesReportComponent,
            canActivate: [PermissionsGuard],
            data: {
              titleId: "unsecuredWebsitesReport",
              permissions: [Permissions.AccessReports],
            },
          },
          {
            path: "weak-passwords-report",
            component: WeakPasswordsReportComponent,
            canActivate: [PermissionsGuard],
            data: {
              titleId: "weakPasswordsReport",
              permissions: [Permissions.AccessReports],
            },
          },
        ],
      },
      {
        path: "manage",
        component: ManageComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissions: NavigationPermissionsService.getPermissions("manage"),
        },
        children: [
          {
            path: "",
            pathMatch: "full",
            redirectTo: "people",
          },
          {
            path: "collections",
            component: CollectionsComponent,
            canActivate: [PermissionsGuard],
            data: {
              titleId: "collections",
              permissions: [
                Permissions.CreateNewCollections,
                Permissions.EditAnyCollection,
                Permissions.DeleteAnyCollection,
                Permissions.EditAssignedCollections,
                Permissions.DeleteAssignedCollections,
              ],
            },
          },
          {
            path: "events",
            component: EventsComponent,
            canActivate: [PermissionsGuard],
            data: {
              titleId: "eventLogs",
              permissions: [Permissions.AccessEventLogs],
            },
          },
          {
            path: "groups",
            component: GroupsComponent,
            canActivate: [PermissionsGuard],
            data: {
              titleId: "groups",
              permissions: [Permissions.ManageGroups],
            },
          },
          {
            path: "people",
            component: PeopleComponent,
            canActivate: [PermissionsGuard],
            data: {
              titleId: "people",
              permissions: [Permissions.ManageUsers, Permissions.ManageUsersPassword],
            },
          },
          {
            path: "policies",
            component: PoliciesComponent,
            canActivate: [PermissionsGuard],
            data: {
              titleId: "policies",
              permissions: [Permissions.ManagePolicies],
            },
          },
        ],
      },
      {
        path: "settings",
        component: SettingsComponent,
        canActivate: [PermissionsGuard],
        data: { permissions: NavigationPermissionsService.getPermissions("settings") },
        children: [
          { path: "", pathMatch: "full", redirectTo: "account" },
          { path: "account", component: AccountComponent, data: { titleId: "myOrganization" } },
          {
            path: "two-factor",
            component: TwoFactorSetupComponent,
            data: { titleId: "twoStepLogin" },
          },
          {
            path: "billing",
            component: BillingComponent,
            canActivate: [PermissionsGuard],
            data: { titleId: "billing", permissions: [Permissions.ManageBilling] },
          },
          {
            path: "subscription",
            component: SubscriptionComponent,
            data: { titleId: "subscription" },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationsRoutingModule {}