"use client";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useDictionary } from "@/dictionaries";
import { pulseObjectList } from "@/lib/pulse";
import Content from "@/components/Content/Content";
import Item from "@/components/ItemList/Item";
import ItemListContainer from "@/components/ItemList/ItemListContainer";
import {
  accesorIncidentAreaDisplayName,
  accesorIncidentDate,
  accesorIncidentListImage,
  accesorIncidentTitle,
  accesorIncidentType,
} from "@/lib/incidentAccessors";
import PageTitle from "@/components/PageTitle";
import { getDeviceJwt } from "@/lib/subscriptions";

import { useGetSentNotificationsQuery } from "@/store/api/pushNotificationsApi";
import ItemAttentionWrapper from "@/components/ItemList/ItemAttentionWrapper";
import ActivityTypePill from "@/components/ActivityTypePill";
import { activityPath } from "@/lib/activity";
import { useUnopenedIncidents } from "@/lib/badge";
import SearchForPlaces from "@/components/SearchForPlaces";

const Page = () => {
  const router = useRouter();
  const { t, locale } = useDictionary();
  const token = getDeviceJwt();

  const { refetchAndUpdateBadge } = useUnopenedIncidents();

  const { data, isSuccess, refetch } = useGetSentNotificationsQuery(
    {
      token: token!,
    },
    {
      skip: !token,
    }
  );

  const hasNotToken = !token;

  const notificationSentItems =
    (isSuccess && data?.results) || pulseObjectList(5);

  return (
    <Content>
      <PageTitle title={t("common:notifications")} />
      {hasNotToken && <SearchForPlaces />}
      {!hasNotToken && (
        <ItemListContainer>
          {notificationSentItems.map((notificationSent: any) => {
            const data = notificationSent.incident || {};
            const showAttention =
              typeof notificationSent.has_been_opened == "undefined"
                ? false
                : !notificationSent.has_been_opened;

            const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();

              if (notificationSent.notification_opened_callback) {
                // mark the notification as opened
                fetch(notificationSent.notification_opened_callback).then(
                  () => {
                    refetch(); // refresh the list
                    refetchAndUpdateBadge(); // update the badge
                  }
                );
              }
              router.push(activityPath(data.id));
            };

            return (
              <ItemAttentionWrapper
                key={`area-${notificationSent.id}`}
                showAttention={showAttention}
              >
                <Item
                  key={`notification-sent-${data.id}`}
                  attrLabels={[
                    accesorIncidentAreaDisplayName(data),
                    accesorIncidentDate(data, locale),
                  ]}
                  title={accesorIncidentTitle(data, locale)}
                  content={
                    <span>
                      <ActivityTypePill name={accesorIncidentType(data)} />
                    </span>
                  }
                  url="#"
                  onClick={onClick}
                  image={accesorIncidentListImage(data)}
                  pulse={!isSuccess}
                />
              </ItemAttentionWrapper>
            );
          })}
        </ItemListContainer>
      )}
    </Content>
  );
};

export default Page;
