import React from "react";
import { Field, useFormikContext } from "formik";
import { Autocomplete } from "@material-ui/lab";
import { Typography, Box, Chip } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import PropTypes from "prop-types";
import "../../styles/form.css";

/**
 * @param {Object} props contains field label to set form label
 * @return {Box} containing form fields for adding scopes
 */
export default function TokenAccess(props) {
  const { label } = props;
  const { setFieldValue } = useFormikContext();

  return (
    <Box className="form-box">
      <div className="form-text">
        <Typography variant="h5">Enter {label.toLowerCase()}</Typography>
      </div>
      <Autocomplete
        multiple
        name={`token${label}`}
        id="tags-filled"
        options={scopes.map((option) => option.scope)}
        freeSolo
        onChange={(e, value) => {
          setFieldValue(`token${label}`, value);
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              key={getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <Field
            {...params}
            multiline
            name={`token${label}`}
            fullWidth
            variant="outlined"
            label={label}
            component={TextField}
          />
        )}
      />
    </Box>
  );
}

TokenAccess.propTypes = {
  label: PropTypes.string,
};

const scopes = [
  { scope: "cloud-platform" },
  { scope: "cloud-platform.read-only" },
  { scope: "adexchange.buyer" },
  { scope: "adsensehost" },
  { scope: "adsense" },
  { scope: "adsense.readonly" },
  { scope: "admin.datatransfer" },
  { scope: "admin.datatransfer.readonly" },
  { scope: "admin.directory.customer" },
  { scope: "admin.directory.customer.readonly" },
  { scope: "admin.directory.device.chromeos" },
  { scope: "admin.directory.device.chromeos.readonly" },
  { scope: "admin.directory.device.mobile" },
  { scope: "admin.directory.device.mobile.action" },
  { scope: "admin.directory.device.mobile.readonly" },
  { scope: "admin.directory.domain" },
  { scope: "admin.directory.domain.readonly" },
  { scope: "admin.directory.group" },
  { scope: "admin.directory.group.member" },
  { scope: "admin.directory.group.member.readonly" },
  { scope: "admin.directory.group.readonly" },
  { scope: "admin.directory.notifications" },
  { scope: "admin.directory.orgunit" },
  { scope: "admin.directory.orgunit.readonly" },
  { scope: "admin.directory.resource.calendar" },
  { scope: "admin.directory.resource.calendar.readonly" },
  { scope: "admin.directory.rolemanagement" },
  { scope: "admin.directory.rolemanagement.readonly" },
  { scope: "admin.directory.user" },
  { scope: "admin.directory.user.alias" },
  { scope: "admin.directory.user.alias.readonly" },
  { scope: "admin.directory.user.readonly" },
  { scope: "admin.directory.user.security" },
  { scope: "admin.directory.userschema" },
  { scope: "admin.directory.userschema.readonly" },
  { scope: "admin.reports.audit.readonly" },
  { scope: "admin.reports.usage.readonly" },
  { scope: "analytics" },
  { scope: "analytics.readonly" },
  { scope: "androidmanagement" },
  { scope: "appengine.admin" },
  { scope: "https://mail.google.com/" },
  { scope: "https://www.google.com/calendar/feeds" },
  { scope: "https://www.google.com/m8/feeds" },
  { scope: "documents" },
  { scope: "drive" },
  { scope: "forms" },
  { scope: "forms.currentonly" },
  { scope: "groups" },
  { scope: "script.deployments" },
  { scope: "script.deployments.readonly" },
  { scope: "script.metrics" },
  { scope: "script.processes" },
  { scope: "script.projects" },
  { scope: "script.projects.readonly" },
  { scope: "spreadsheets" },
  { scope: "userinfo.email" },
  { scope: "bigquery" },
  { scope: "bigquery.insertdata" },
  { scope: "bigquery.readonly" },
  { scope: "devstorage.full_control" },
  { scope: "devstorage.read_only" },
  { scope: "devstorage.read_write" },
  { scope: "blogger" },
  { scope: "blogger.readonly" },
  { scope: "books" },
  { scope: "calendar" },
  { scope: "calendar.events" },
  { scope: "calendar.events.readonly" },
  { scope: "calendar.readonly" },
  { scope: "calendar.settings.readonly" },
  { scope: "verifiedaccess" },
  { scope: "bigtable.admin" },
  { scope: "bigtable.admin.cluster" },
  { scope: "bigtable.admin.instance" },
  { scope: "bigtable.admin.table" },
  { scope: "cloud-bigtable.admin" },
  { scope: "cloud-bigtable.admin.cluster" },
  { scope: "cloud-bigtable.admin.table" },
  { scope: "ndev.clouddns.readonly" },
  { scope: "ndev.clouddns.readwrite" },
  { scope: "datastore" },
  { scope: "cloud_debugger" },
  { scope: "cloud-identity.groups" },
  { scope: "cloud-identity.groups.readonly" },
  { scope: "cloudiot" },
  { scope: "cloudkms" },
  { scope: "logging.admin" },
  { scope: "logging.read" },
  { scope: "logging.write" },
  { scope: "monitoring" },
  { scope: "monitoring.read" },
  { scope: "monitoring.write" },
  { scope: "cloud-language" },
  { scope: "compute" },
  { scope: "pubsub" },
  { scope: "cloudruntimeconfig" },
  { scope: "sqlservice.admin" },
  { scope: "cloud_search" },
  { scope: "cloud_search.debug" },
  { scope: "cloud_search.indexing" },
  { scope: "cloud_search.query" },
  { scope: "cloud_search.settings" },
  { scope: "cloud_search.settings.indexing" },
  { scope: "cloud_search.settings.query" },
  { scope: "cloud_search.stats" },
  { scope: "cloud_search.stats.indexing" },
  { scope: "source.full_control" },
  { scope: "source.read_only" },
  { scope: "source.read_write" },
  { scope: "spanner.admin" },
  { scope: "spanner.data" },
  { scope: "jobs" },
  { scope: "trace.append" },
  { scope: "cloud-translation" },
  { scope: "cloud-vision" },
  { scope: "compute.readonly" },
  { scope: "content" },
  { scope: "ddmconversions" },
  { scope: "dfareporting" },
  { scope: "dfatrafficking" },
  { scope: "dialogflow" },
  { scope: "display-video" },
  { scope: "doubleclickbidmanager" },
  { scope: "drive.appdata" },
  { scope: "drive.file" },
  { scope: "drive.metadata" },
  { scope: "drive.metadata.readonly" },
  { scope: "drive.photos.readonly" },
  { scope: "drive.readonly" },
  { scope: "drive.scripts" },
  { scope: "activity" },
  { scope: "drive.activity" },
  { scope: "drive.activity.readonly" },
  { scope: "apps.order" },
  { scope: "apps.order.readonly" },
  { scope: "firebase" },
  { scope: "firebase.readonly" },
  { scope: "fitness.activity.read" },
  { scope: "fitness.activity.write" },
  { scope: "fitness.blood_glucose.read" },
  { scope: "fitness.blood_glucose.write" },
  { scope: "fitness.blood_pressure.read" },
  { scope: "fitness.blood_pressure.write" },
  { scope: "fitness.body.read" },
  { scope: "fitness.body.write" },
  { scope: "fitness.body_temperature.read" },
  { scope: "fitness.body_temperature.write" },
  { scope: "fitness.location.read" },
  { scope: "fitness.location.write" },
  { scope: "fitness.nutrition.read" },
  { scope: "fitness.nutrition.write" },
  { scope: "fitness.oxygen_saturation.read" },
  { scope: "fitness.oxygen_saturation.write" },
  { scope: "fitness.reproductive_health.read" },
  { scope: "fitness.reproductive_health.write" },
  { scope: "apps.alerts" },
  { scope: "ediscovery" },
  { scope: "ediscovery.readonly" },
  { scope: "genomics" },
  { scope: "gmail.addons.current.action.compose" },
  { scope: "gmail.addons.current.message.action" },
  { scope: "gmail.addons.current.message.metadata" },
  { scope: "gmail.addons.current.message.readonly" },
  { scope: "gmail.compose" },
  { scope: "gmail.insert" },
  { scope: "gmail.labels" },
  { scope: "gmail.metadata" },
  { scope: "gmail.modify" },
  { scope: "gmail.readonly" },
  { scope: "gmail.send" },
  { scope: "gmail.settings.basic" },
  { scope: "gmail.settings.sharing" },
  { scope: "analytics.edit" },
  { scope: "analytics.manage.users" },
  { scope: "analytics.manage.users.readonly" },
  { scope: "analytics.provision" },
  { scope: "analytics.user.deletion" },
  { scope: "classroom.announcements" },
  { scope: "classroom.announcements.readonly" },
  { scope: "classroom.courses" },
  { scope: "classroom.courses.readonly" },
  { scope: "classroom.coursework.me" },
  { scope: "classroom.coursework.me.readonly" },
  { scope: "classroom.coursework.students" },
  { scope: "classroom.coursework.students.readonly" },
  { scope: "classroom.guardianlinks.me.readonly" },
  { scope: "classroom.guardianlinks.students" },
  { scope: "classroom.guardianlinks.students.readonly" },
  { scope: "classroom.profile.emails" },
  { scope: "classroom.profile.photos" },
  { scope: "classroom.push-notifications" },
  { scope: "classroom.rosters" },
  { scope: "classroom.rosters.readonly" },
  { scope: "classroom.student-submissions.me.readonly" },
  { scope: "classroom.student-submissions.students.readonly" },
  { scope: "classroom.topics" },
  { scope: "classroom.topics.readonly" },
  { scope: "ndev.cloudman" },
  { scope: "ndev.cloudman.readonly" },
  { scope: "documents.readonly" },
  { scope: "userinfo.profile" },
  { scope: "androidpublisher" },
  { scope: "androidenterprise" },
  { scope: "games" },
  { scope: "spreadsheets.readonly" },
  { scope: "siteverification" },
  { scope: "siteverification.verify_only" },
  { scope: "presentations" },
  { scope: "presentations.readonly" },
  { scope: "apps.groups.migration" },
  { scope: "apps.groups.settings" },
  { scope: "indexing" },
  { scope: "apps.licensing" },
  { scope: "manufacturercenter" },
  { scope: "contacts" },
  { scope: "contacts.other.readonly" },
  { scope: "contacts.readonly" },
  { scope: "directory.readonly" },
  { scope: "user.addresses.read" },
  { scope: "user.birthday.read" },
  { scope: "user.emails.read" },
  { scope: "user.gender.read" },
  { scope: "user.organization.read" },
  { scope: "user.phonenumbers.read" },
  { scope: "photoslibrary" },
  { scope: "photoslibrary.appendonly" },
  { scope: "photoslibrary.readonly" },
  { scope: "photoslibrary.readonly.appcreateddata" },
  { scope: "photoslibrary.sharing" },
  { scope: "doubleclicksearch" },
  { scope: "webmasters" },
  { scope: "webmasters.readonly" },
  { scope: "servicecontrol" },
  { scope: "service.management" },
  { scope: "service.management.readonly" },
  { scope: "streetviewpublish" },
  { scope: "tagmanager.delete.containers" },
  { scope: "tagmanager.edit.containers" },
  { scope: "tagmanager.edit.containerversions" },
  { scope: "tagmanager.manage.accounts" },
  { scope: "tagmanager.manage.users" },
  { scope: "tagmanager.publish" },
  { scope: "tagmanager.readonly" },
  { scope: "tasks" },
  { scope: "tasks.readonly" },
  { scope: "youtube" },
  { scope: "youtube.readonly" },
  { scope: "youtubepartner" },
  { scope: "yt-analytics-monetary.readonly" },
  { scope: "yt-analytics.readonly" },
  { scope: "youtube.channel-memberships.creator" },
  { scope: "youtube.force-ssl" },
  { scope: "youtube.upload" },
  { scope: "youtubepartner-channel-audit" },
];
