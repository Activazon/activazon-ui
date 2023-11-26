"use client";
import { useEffect, useState } from "react";
import { useDictionary } from "@/dictionaries";
import { pulseObjectList } from "@/lib/pulse";
import Content from "@/components/Content/Content";
import Item from "@/components/ItemList/Item";
import ItemListContainer from "@/components/ItemList/ItemListContainer";
import {
  accesorIncidentAreaDisplayName,
  accesorIncidentListImage,
  accesorIncidentTitle,
  accesorIncidentType,
} from "@/lib/incidentAccessors";
import PageTitle from "@/components/PageTitle";
import { getDeviceJwt } from "@/lib/subscriptions";
import { isDisplayModeStandalone } from "@/lib/browser";
import { setModel } from "@/store/slices/modals";
import { useActivazonDispatch } from "@/store/hooks";
import {
  useGetSentNotificationsQuery,
  useGetSubscriptionsQuery,
} from "@/store/api/pushNotificationsApi";
import ItemAttentionWrapper from "@/components/ItemList/ItemAttentionWrapper";
import ActivityTypePill from "@/components/ActivityTypePill";
import { activityPath } from "@/lib/activity";

const Page = () => {
  const { t, locale } = useDictionary();
  const dispatch = useActivazonDispatch();
  const [isDeviceRegistered, _] = useState(getDeviceJwt());
  const token = getDeviceJwt();

  useEffect(() => {
    if (!isDeviceRegistered && !isDisplayModeStandalone()) {
      dispatch(
        setModel({
          name: "pwa_install",
          data: undefined,
        })
      );
    }
  }, [isDeviceRegistered, dispatch]);

  const { data, isSuccess } = useGetSentNotificationsQuery(
    {
      token: token!,
    },
    {
      skip: !token,
    }
  );

  const notificationSentItems =
    (isSuccess && data?.results) || pulseObjectList(5);

  return (
    <Content>
      <PageTitle title={t("common:notifications")} />
      <ItemListContainer>
        {notificationSentItems.map((notificationSent: any) => {
          const data = notificationSent.incident || {};
          const showAttention =
            typeof notificationSent.has_been_opened == "undefined"
              ? false
              : !notificationSent.has_been_opened;

          return (
            <ItemAttentionWrapper
              key={`area-${notificationSent.id}`}
              showAttention={showAttention}
            >
              <Item
                key={`notification-sent-${data.id}`}
                title={accesorIncidentTitle(data, locale)}
                descriptionMd={accesorIncidentAreaDisplayName(data)}
                badge={
                  <span>
                    <ActivityTypePill name={accesorIncidentType(data)} />
                  </span>
                }
                url={activityPath(data.id)}
                image={accesorIncidentListImage(data)}
                pulse={!isSuccess}
              />
            </ItemAttentionWrapper>
          );
        })}
      </ItemListContainer>
    </Content>
  );
};

export default Page;
