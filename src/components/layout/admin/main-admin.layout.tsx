import {
  AppShell,
  Avatar,
  Box,
  Flex,
  Footer,
  Group,
  Header,
  Menu,
  NavLink,
  Navbar,
  Paper,
  Text,
  TextInput,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import {
  IconAlertTriangle,
  IconBook2,
  IconBrandDiscord,
  IconBrandGithub,
  IconDashboard,
  IconGitFork,
  IconHome,
  IconLogout,
  IconMailForward,
  IconQuestionMark,
  IconSun,
  IconUser,
  IconUserSearch,
  IconUsers,
} from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { usePackageAttributesStore } from '~/tools/client/zustands/usePackageAttributesStore';

import { Logo } from '../Logo';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { t } = useTranslation();
  const { attributes } = usePackageAttributesStore();
  const theme = useMantineTheme();
  return (
    <AppShell
      styles={{
        root: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
        },
      }}
      navbar={
        <Navbar width={{ base: 300 }}>
          <Navbar.Section pt="xs" grow>
            <NavLink
              icon={
                <ThemeIcon size="md" variant="light" color="red">
                  <IconHome size="1rem" />
                </ThemeIcon>
              }
              label="Home"
              component={Link}
              href="/manage/"
            />
            <NavLink
              label="Users"
              icon={
                <ThemeIcon size="md" variant="light" color="red">
                  <IconUser size="1rem" />
                </ThemeIcon>
              }
            >
              <NavLink
                icon={<IconUsers size="1rem" />}
                label="Manage"
                component={Link}
                href="/manage/users"
              />
              <NavLink
                icon={<IconMailForward size="1rem" />}
                label="Invites"
                component={Link}
                href="/manage/users/invites"
              />
            </NavLink>
            <NavLink
              label="Help"
              icon={
                <ThemeIcon size="md" variant="light" color="red">
                  <IconQuestionMark size="1rem" />
                </ThemeIcon>
              }
            >
              <NavLink
                icon={<IconBook2 size="1rem" />}
                component="a"
                href="https://homarr.dev/docs/about"
                label="Documentation"
              />
              <NavLink
                icon={<IconBrandGithub size="1rem" />}
                component="a"
                href="https://github.com/ajnart/homarr/issues/new/choose"
                label="Report an issue / bug"
              />
              <NavLink
                icon={<IconBrandDiscord size="1rem" />}
                component="a"
                href="https://discord.com/invite/aCsmEV5RgA"
                label="Community Discord"
              />
              <NavLink
                icon={<IconGitFork size="1rem" />}
                component="a"
                href="https://github.com/ajnart/homarr"
                label="Contribute"
              />
            </NavLink>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60 + 30} pb="sm" pt={0}>
          <Box bg="red" h={30} p={3} px={6}>
            <Flex h="100%" align="center" columnGap={7}>
              <IconAlertTriangle color="white" size="1rem" />
              <Text color="white">
                This is an experimental feature of Homarr. Please report any issues to the official
                Homarr team.
              </Text>
            </Flex>
          </Box>
          <Group spacing="xl" mt="xs" px="md" position="apart" noWrap>
            <UnstyledButton component={Link} href="/manage">
              <Logo />
            </UnstyledButton>
            <TextInput radius="xl" w={400} placeholder="Search..." variant="filled" />

            <Group noWrap>
              <UnstyledButton>
                <Menu>
                  <Menu.Target>
                    <Avatar />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item icon={<IconSun size="1rem" />}>Switch theme</Menu.Item>
                    <Menu.Item icon={<IconUserSearch size="1rem" />}>View Profile</Menu.Item>
                    <Menu.Item icon={<IconDashboard size="1rem" />}>Default Dashboard</Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      icon={<IconLogout size="1rem" />}
                      color="red"
                      onClick={() => signOut()}
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </UnstyledButton>
            </Group>
          </Group>
        </Header>
      }
      footer={
        <Footer height={25}>
          <Group position="apart" px="md">
            <Flex gap="md" align="center" columnGap={5}>
              <Image src="/imgs/logo/logo.svg" width={20} height={20} alt="" />
              <Text fw="bold" size={15}>
                Homarr
              </Text>
              {attributes.packageVersion && (
                <Text color="dimmed" size={13}>
                  {attributes.packageVersion}
                </Text>
              )}
            </Flex>
          </Group>
        </Footer>
      }
    >
      <Paper p="xl" mih="100%" withBorder>
        {children}
      </Paper>
    </AppShell>
  );
};
