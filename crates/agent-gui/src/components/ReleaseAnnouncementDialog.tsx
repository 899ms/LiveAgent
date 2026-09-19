import { ExternalLink } from "@liveagent/ui/components/IconSet";
import { Markdown } from "@liveagent/ui/components/Markdown";
import { Button } from "@liveagent/ui/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@liveagent/ui/components/ui/dialog";
import { useLocale } from "@liveagent/ui/i18n/index";
import { openUrl } from "@tauri-apps/plugin-opener";
import type { ReleaseAnnouncementController } from "../lib/releaseAnnouncement";
import { releaseNotesBody, releaseTitle } from "../lib/releaseNotes";
import { formatReleaseDate } from "../pages/settings/aboutDate";

export function ReleaseAnnouncementDialog({
  controller,
}: {
  controller: ReleaseAnnouncementController;
}) {
  const { t } = useLocale();
  const announcement = controller.announcement;
  if (!announcement) return null;

  const title = releaseTitle(announcement) || `LiveAgent v${announcement.currentVersion}`;
  const releaseDate = formatReleaseDate(announcement.date);
  const meta = [
    `v${announcement.currentVersion}`,
    releaseDate ? `${t("settings.aboutReleaseDate")} ${releaseDate}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Dialog
      open={controller.open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) controller.dismissForNow();
      }}
    >
      <DialogContent
        className="max-w-2xl"
        showCloseButton
        closeLabel={t("appUpdate.announcementClose")}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{meta}</DialogDescription>
        </DialogHeader>
        <DialogBody className="max-h-[70vh]">
          <Markdown
            content={releaseNotesBody(announcement)}
            className="release-notes-markdown text-sm leading-relaxed text-muted-foreground"
          />
        </DialogBody>
        <DialogFooter className="justify-between max-[820px]:flex-col-reverse">
          {announcement.releaseUrl ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => void openUrl(announcement.releaseUrl || "")}
            >
              <ExternalLink className="size-3.5" />
              {t("appUpdate.announcementOpenRelease")}
            </Button>
          ) : (
            <span />
          )}
          <div className="flex items-center justify-end gap-2 max-[820px]:w-full max-[820px]:[&>button]:flex-1">
            <Button type="button" variant="outline" size="sm" onClick={controller.dismissForNow}>
              {t("appUpdate.announcementLater")}
            </Button>
            <Button type="button" size="sm" onClick={controller.acknowledge}>
              {t("appUpdate.announcementAcknowledge")}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
